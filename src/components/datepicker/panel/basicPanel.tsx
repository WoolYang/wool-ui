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
    showMonthPicker?: any;
    showYearPicker?: any;
}

export class BasicPanel extends React.Component<BasicPanelProps, any> {

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
        handleChange: PropTypes.func,
        showMonthPicker: PropTypes.func,
        showYearPicker: PropTypes.func
    };

    //年显示标签
    yearLabel() {
        const { date, prefixCls, currentView } = this.props;
        let displayYear = date.getFullYear() + '年'
        if (currentView === PICKER_VIEWS.YEAR) {
            const startYear = Math.floor(date.getFullYear() / 10) * 10
            displayYear = `${startYear} 年-${startYear + 9} 年`
        }
        return <span className={`${prefixCls}__header-label`} onClick={this.showYearPicker} >{displayYear}</span>;
    }

    showMonthPicker = () => {
        const { showMonthPicker } = this.props;
        showMonthPicker && showMonthPicker(PICKER_VIEWS.MONTH)
    }

    showYearPicker = () => {
        const { showYearPicker } = this.props;
        showYearPicker && showYearPicker(PICKER_VIEWS.YEAR)
    }

    //月显示标签
    monthLabel() {
        const { date, currentView, prefixCls } = this.props;
        if (currentView === PICKER_VIEWS.DATE) {
            return <span className={`${prefixCls}__header-label`} onClick={this.showMonthPicker} >{(date.getMonth() + 1) + '月'}</span>
        }
        return null
    }

    prevMonth = () => {
        const { handleChange, date } = this.props;

        const newDate = new Date(date);
        if (newDate.getMonth() == 0) {
            newDate.setFullYear(newDate.getFullYear() - 1)
            newDate.setMonth(11)
        } else {
            newDate.setMonth(newDate.getMonth() - 1)
        }
        handleChange(newDate)

    }

    nextMonth = () => {
        const { handleChange, date } = this.props;

        const newDate = new Date(date);
        if (newDate.getMonth() == 11) {
            newDate.setFullYear(newDate.getFullYear() + 1)
            newDate.setMonth(0)
        } else {
            newDate.setMonth(newDate.getMonth() + 1)
        }
        handleChange(newDate)
    }

    render() {
        const { prefixCls, date, currentView } = this.props;

        return (
            <div className={`${prefixCls}__header`}>
                <i className='left-arrow' onClick={this.prevMonth} />
                {this.yearLabel()}
                {this.monthLabel()}
                <i className='right-arrow' onClick={this.nextMonth} />
            </div >
        )
    }
}