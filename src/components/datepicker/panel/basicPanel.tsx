import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import '../style/datePicker.less';

export type SelectionMode = 'year' | 'month' | 'week' | 'day';
export interface BasicPanelProps {
    prefixCls?: string;
    value?: Date | null;
    disabled?: boolean;//是否是禁用
    readOnly?: boolean;//是否是只读
    placeholder?: string;//占位内容
    name?: string;//名称
    clearable?: boolean;//是否可清除
    format?: string;          //时间日期格式化
    isShowTime?: boolean;        //是否显示时间
    onFocus?: any;
    onBlur?: any;
    shortcuts?: any;         //快捷选项
    selectionMode?: SelectionMode;   //日期类型
    showWeekNumber?: boolean;     //是否展示周数
    onChange?: any;
}

export class BasicPanel extends React.Component<BasicPanelProps, any> {

    [x: string]: any;  //标签索引，否则el会未定义

    static defaultProps = {
        prefixCls: 'wool-datepicker',
        disabled: false,
        readOnly: false,
        clearable: true,
        format: 'yyyy-MM-dd',
        isShowTime: false,
        selectionMode: 'day',
        showWeekNumber: false
    }

    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        placeholder: PropTypes.string,
        name: PropTypes.string,
        clearable: PropTypes.bool,
        format: PropTypes.string,
        isShowTime: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        shortcuts: PropTypes.func,
        selectionMode: PropTypes.oneOf(['year', 'month', 'week', 'day']),
        showWeekNumber: PropTypes.bool,
    };

    constructor(props: BasicPanelProps) {
        super(props);
        this.state = {
            visible: false,
            inputHover: false
        }
    }

    render() {
        const { prefixCls, value, readOnly, disabled, placeholder, name } = this.props;

        return (
            <div className={`${prefixCls}-header`}>
                <i className='left-arrow' />
                <span>2017年</span>
                <span>11月</span>
                <i className='right-arrow' />
            </div >
        )
    }
}