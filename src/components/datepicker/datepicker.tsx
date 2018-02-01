import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { Input } from '../input/index';
import { Transition, View } from '../libs';
import { contains } from '../libs/utils/utils';
import { BasicPanel } from './panel/index';
import { DateView, MonthView } from './view/index';
import { SELECTION_MODE, PICKER_VIEWS, toDate, formatDate } from "./utils/index";
import './style/datePicker.less';

export type SelectionMode = 'year' | 'month' | 'week' | 'day';
export type Align = 'left' | 'center' | 'right';
export interface DatePickerProps {
    prefixCls?: string;
    value?: Date | null;
    disabled?: boolean;//是否是禁用
    readOnly?: boolean;//是否是只读
    placeholder?: string;//占位内容
    name?: string;//名称
    clearable?: boolean;//是否可清除
    format?: string;          //时间日期格式化
    align?: Align;            //对齐方式
    isShowTime?: boolean;        //是否显示时间
    onFocus?: any;
    onBlur?: any;
    shortcuts?: any;         //快捷选项
    selectionMode?: SelectionMode;   //日期类型
    showWeekNumber?: boolean;     //是否展示周数
    onChange?: any; //日期改变
    renderInput?: any; //自定义显示
}

export class DatePicker extends React.Component<DatePickerProps, any> {

    [x: string]: any;  //标签索引，否则el会未定义

    static defaultProps = {
        prefixCls: 'wool-datepicker',
        disabled: false,
        readOnly: false,
        clearable: true,
        format: 'yyyy-MM-dd',
        align: 'left',
        isShowTime: false,
        selectionMode: 'day',
        showWeekNumber: true,
        placeholder: '选择日期'
    }

    static propTypes = {
        value: PropTypes.instanceOf(Date),
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        placeholder: PropTypes.string,
        name: PropTypes.string,
        clearable: PropTypes.bool,
        format: PropTypes.string,
        align: PropTypes.oneOf(['left', 'center', 'right']),
        isShowTime: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        shortcuts: PropTypes.func,
        selectionMode: PropTypes.oneOf(['year', 'month', 'week', 'day']),
        showWeekNumber: PropTypes.bool,
        renderInput: PropTypes.func
    };

    constructor(props: DatePickerProps) {
        super(props);
        this.state = {
            visible: false,
            inputHover: false,
            currentView: this.initCurrentView(), //当前视图
            date: new Date() //当前日期
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutClose);

    }

    componentWillReceiveProps(nextProps: DatePickerProps) {
        let date = new Date()
        if (nextProps.value) {
            date = toDate(nextProps.value)
        }

        this.setState({ date })
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutClose);
    }

    //日期get
    get visibleDate() {
        const { renderInput, value } = this.props;
        return renderInput ? renderInput(value) : formatDate(value, this.dateFormat)
    }
    //默认格式化处理
    get dateFormat() {
        if (this.props.format) return this.props.format.replace('HH:mm', '').replace(':ss', '').trim()
        else return 'yyyy-MM-dd'
    }

    //日期set 输入时使用 (暂未实现)
    /*     set visibleDate(val) {
            const ndate = parseDate(val, this.dateFormat);
            const { date } = this.state;
            if (!ndate) {
                return
            }
             let { disabledDate } = this.props
            if (typeof disabledDate === 'function' && disabledDate(ndate)) {
                return
            }
            ndate.setHours(date.getHours())
            ndate.setMinutes(date.getMinutes())
            ndate.setSeconds(date.getSeconds())
            this.setState({ date: ndate })
            this.resetView()
        } */

    //初始化视图状态
    initCurrentView() {
        let currentView;
        switch (this.props.selectionMode) {
            case SELECTION_MODE.MONTH:
                currentView = PICKER_VIEWS.MONTH; break;
            case SELECTION_MODE.YEAR:
                currentView = PICKER_VIEWS.YEAR; break;
            default:
                currentView = PICKER_VIEWS.DATE;
        }
        return currentView
    }

    //点击外元素关闭事件
    handleOutClose = (e: any) => {
        if (!contains(this.select, e.target)) {
            this.setState({ visible: false });
        }
    }

    //icon点击事件
    handleIconClick = () => {
        if (this.iconClass().indexOf('close-icon') > -1) {
            this.clearSelected();
        }
    }

    //切换下拉框显示
    handleToggle = (e?: any) => {
        this.setState((prev: any) => {
            prev.visible = !this.state.visible;
            return prev;
        });
    }

    //鼠标进入事件
    handleMouseEnter = () => {
        this.setState({ inputHover: true })
    }

    //鼠标移出事件
    handleMouseLeave = () => {
        this.setState({ inputHover: false })
    }

    //清除选中项事件
    clearSelected = () => {
        const { onChange } = this.props;
        onChange && onChange({ value: null });
        this.setState({ visible: false });
    }

    //icon样式计算
    iconClass() {
        const { clearable, value } = this.props;
        const { visible, inputHover } = this.state;

        return clearable && !visible && inputHover && Boolean(value) ?
            'close-icon' : 'icon-home'

    }

    //视图显示
    pickerContent() {
        const { selectionMode, showWeekNumber } = this.props;
        const { currentView, date } = this.state;
        let result = null;
        switch (currentView) {
            case PICKER_VIEWS.DATE:
                result = (<DateView
                    selectionMode={selectionMode}
                    showWeekNumber={showWeekNumber}
                    date={date}
                    onPick={this.handleDatePick}
                />)
                break
            case PICKER_VIEWS.MONTH:
                result = (<MonthView
                    selectionMode={selectionMode}
                    date={date}
                    onPick={this.handleDatePick}
                />)
                break
            default:
                throw new Error('invalid currentView value')
        }
        return result;
    }

    //年月日选择
    handleDatePick = ({ date }: { [key: string]: Date }) => {
        const { onChange } = this.props;
        onChange && onChange({ value: date })
        this.setState({ date });
    }

    render() {
        const { prefixCls, value, readOnly, disabled, placeholder, name, } = this.props;
        const { visible, date, currentView } = this.state;
        return (
            <div ref={c => this.select = c}
                className={prefixCls}
            >
                <Input
                    name={name}
                    value={this.visibleDate}
                    readOnly={readOnly}
                    suffix={<i className={this.iconClass()} onClick={this.handleIconClick} onMouseEnter={this.handleMouseEnter} />}
                    onClick={this.handleToggle}
                    disabled={disabled}
                    placeholder={placeholder}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                ></Input>
                <Transition name={prefixCls} >
                    <View show={visible}>
                        <div className={`${prefixCls}-dropdown`} >
                            <BasicPanel date={date} currentView={currentView} handleChange={this.handleDatePick} />
                            <div className={`${prefixCls}-content`}>
                                {visible ? this.pickerContent() : null}
                            </div>
                        </div>
                    </View>
                </Transition>
            </div >
        )
    }
}