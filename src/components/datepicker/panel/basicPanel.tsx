import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { SELECTION_MODE, PICKER_VIEWS } from "../utils/index";
import '../style/datePicker.less';

export type SelectionMode = 'year' | 'month' | 'week' | 'day';
export interface BasicPanelProps {
    prefixCls?: string;
    date?: Date | null;
    currentView?: string;
    name?: string;//名称
    format?: string;          //时间日期格式化
    selectionMode?: SelectionMode;   //日期类型
    handleChange?: any;
}

export class BasicPanel extends React.Component<BasicPanelProps, any> {

    [x: string]: any;  //标签索引，否则el会未定义

    static defaultProps = {
        prefixCls: 'wool-datepicker',
        format: 'yyyy-MM-dd',
        isShowTime: false,
        selectionMode: 'day',
    }

    static propTypes = {
        date: PropTypes.instanceOf(Date),
        currentView: PropTypes.string,
        format: PropTypes.string,
        selectionMode: PropTypes.oneOf(['year', 'month', 'week', 'day']),
        handleChange: PropTypes.func
    };

    constructor(props: BasicPanelProps) {
        super(props);
        this.state = {
            date: props.date
        }
    }

    componentWillReceiveProps(nextProps: BasicPanelProps) {
        this.setState({ date: nextProps.date })
    }

    //年显示标签
    yearLabel() {
        const { date } = this.state
        return <span>{date.getFullYear() + '年'}</span>
    }

    //月显示标签
    monthLabel() {
        const { date, currentView } = this.props;
        if (currentView === PICKER_VIEWS.DATE) {
            return <span>{(date.getMonth() + 1) + '月'}</span>
        }
        return null
    }

    prevMonth = () => {
        const { date } = this.state;
        const { handleChange } = this.props;

        if (date.getMonth() == 0) {
            date.setFullYear(date.getFullYear() - 1)
            date.setMonth(11)
        } else {
            date.setMonth(date.getMonth() - 1)
        }
        handleChange({ date: date })

    }

    nextMonth = () => {
        const { date } = this.state;
        const { handleChange } = this.props;

        if (date.getMonth() == 11) {
            date.setFullYear(date.getFullYear() + 1)
            date.setMonth(0)
        } else {
            date.setMonth(date.getMonth() + 1)
        }
        handleChange({ date: date })
    }

    render() {
        const { prefixCls, date, currentView } = this.props;

        return (
            <div className={`${prefixCls}-header`}>
                <i className='left-arrow' onClick={this.prevMonth} />
                {this.yearLabel()}
                {this.monthLabel()}
                <i className='right-arrow' onClick={this.nextMonth} />
            </div >
        )
    }
}