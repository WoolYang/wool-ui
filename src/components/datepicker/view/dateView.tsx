import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import {
    WEEKS,
    DAY_DURATION,
    SELECTION_MODE,
    getFirstDayOfMonth,
    getDayCountOfMonth,
    getStartDateCellOfMonth,
    clearHours,
    getWeekNumber,
    getOffsetToWeekOrigin
} from "../utils/index";

export type SelectionMode = 'year' | 'month' | 'week' | 'day';
export interface DateViewProps {
    selectionMode?: SelectionMode;   //日期类型
    showWeekNumber?: boolean;     //是否展示周数
    date?: Date; //日期
    prefixCls?: string;
    onPick?: any;
}

export default class DateView extends React.Component<DateViewProps, any> {

    static defaultProps = {
        prefixCls: 'wool-datepicker'
    }

    static propTypes = {
        selectionMode: PropTypes.oneOf(['year', 'month', 'week', 'day']),
        showWeekNumber: PropTypes.bool,
        date: PropTypes.instanceOf(Date).isRequired,
        onPick: PropTypes.func,
    };

    constructor(props: DateViewProps) {
        super(props)

        this.state = {
            tableRows: [[], [], [], [], [], []],
            firstDayOfWeek: 0 //每周日期偏移，周日0，周六6
        }
    }

    //表格行列计算
    getRows() {
        const { date, showWeekNumber, selectionMode } = this.props;
        const { tableRows, firstDayOfWeek } = this.state;
        //获取当前选择日期
        const ndate = new Date(date.getTime());
        //获取当月的第一天是该周的第几天
        let day = getFirstDayOfMonth(ndate);
        //获取当月天数
        const dateCountOfMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth());
        //获取上月天数，1月的上月为12月
        const dateCountOfLastMonth = getDayCountOfMonth(ndate.getFullYear(), (ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1));
        //单元格偏移天数
        const offsetDaysToWeekOrigin = getOffsetToWeekOrigin(day, firstDayOfWeek);
        //日期计数面板
        const rows = tableRows;
        //id计数
        let count = 1;
        //记录第一天位置
        let firstDayPosition;
        //获得单元格第一个日期
        const startDate = getStartDateCellOfMonth(ndate.getFullYear(), ndate.getMonth(), firstDayOfWeek);
        //当前日期，时间置零
        const now = clearHours(new Date());

        for (var i = 0; i < 6; i++) {
            const row = rows[i]; //一行
            if (showWeekNumber) {//是否显示周号
                //获取周号，参数为根据startDate计算每行起始天数
                row[0] = { type: 'week', text: getWeekNumber(new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))) };
            }
            //单元格计算
            for (var j = 0; j < 7; j++) {
                let cell = row[showWeekNumber ? j + 1 : j]; //显示周从索引1开始
                if (!cell) {
                    //row,column坐标，type类型，inRange范围内
                    row[showWeekNumber ? j + 1 : j] = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
                    cell = row[showWeekNumber ? j + 1 : j]
                }

                cell.type = 'normal';

                const index = i * 7 + j; //当前cell索引值
                const time = startDate.getTime() + DAY_DURATION * index; //当前索引值日期

                /*                 cell.inRange = time >= clearHours(minDate) && time <= clearHours(maxDate);
                                cell.start = minDate && time === clearHours(minDate);
                                cell.end = maxDate && time === clearHours(maxDate); */

                const isToday = time === now;
                //标记今天
                if (isToday) {
                    cell.type = 'today';
                }

                if (i === 0) { //处理第一行
                    if (j >= offsetDaysToWeekOrigin) { //从偏移位置开始记录本月
                        cell.text = count++;
                        if (count === 2) { //记录第一次记录完成即获得第一天位置
                            firstDayPosition = j;
                        }
                    } else {
                        //小于偏移位置单元格计数上月
                        //计数公式：上月天数-偏移天数+当前格索引+1
                        cell.text = dateCountOfLastMonth - offsetDaysToWeekOrigin + j + 1;
                        cell.type = 'prev-month';
                    }
                } else {
                    //第二行开始小于当月天数即为当月日期
                    if (count <= dateCountOfMonth) {
                        cell.text = count++;
                        if (count === 2) { //第一周完全偏移时，其实日会在第二行
                            firstDayPosition = i * 7 + j;
                        }
                    } else {// 大于当月天数即为下个月，补满
                        cell.text = count++ - dateCountOfMonth;
                        cell.type = 'next-month';
                    }
                }
                //cell.disabled = isFunction(disabledDate) && disabledDate(new Date(time), SELECTION_MODES.DAY);
            }

        }
        rows.firstDayPosition = firstDayPosition;
        return rows;
    }

    //单元格样式
    getCellClasses(cell: { [key: string]: any }) {
        const { selectionMode, date } = this.props
        const cellClass = classNames({
            ['available']: (cell.type === 'normal' || cell.type === 'today') && !cell.disabled, //可用日期样式
            ['today']: cell.type === 'today',//今天样式
            ['prev-month']: cell.type === 'prev-month',//上个月样式
            ['next-month']: cell.type === 'next-month',//下个月样式
            ['disabled']: cell.type === 'disabled',//不可选样式
            ['current']: selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && date.getDate() === +cell.text//当前选择样式
        });
        return cellClass;
    }

    //单元格点击
    handleClick = (e: any) => {
        const { selectionMode, date, onPick } = this.props

        let target: any = e.target;
        if (target.tagName !== 'TD') return;
        if (target.classList.contains('disabled') || target.classList.contains('week')) return;

        if (selectionMode === 'week') { //周选择
            target = target.parentNode.cells[1];
        }

        const year = date.getFullYear();
        const month = date.getMonth();

        const cellIndex = target.cellIndex; //列索引
        const rowIndex = target.parentNode.rowIndex - 1; //行索引

        const cell = this.getRows()[rowIndex][cellIndex]; //根据索引取对应的cell对象

        const text = cell.text;  //日期值
        const className = target.className; //样式名

        const newDate = new Date(year, month, 1); //所选年月

        if (cell.type === 'week') return; //点击周号返回

        //点击前月，后月设置选择年月
        if (className.indexOf('prev') !== -1) {
            if (month === 0) {
                newDate.setFullYear(year - 1)
                newDate.setMonth(11)
            } else {
                newDate.setMonth(month - 1)
            }
        } else if (className.indexOf('next') !== -1) {
            if (month === 11) {
                newDate.setFullYear(year + 1)
                newDate.setMonth(0)
            } else {
                newDate.setMonth(month + 1)
            }
        }
        //设置选择日
        newDate.setDate(parseInt(text, 10));

        if (selectionMode === SELECTION_MODE.DAY || selectionMode === SELECTION_MODE.WEEK) {
            onPick(newDate)
        }

    }

    render() {

        const { selectionMode, showWeekNumber, prefixCls } = this.props;

        return (
            <table
                cellSpacing="0"
                cellPadding="0"
                className={classNames(`${prefixCls}-datetable`)}
                onClick={this.handleClick}
            >
                <tbody>
                    <tr>
                        {showWeekNumber && <th>周</th>}
                        {
                            WEEKS.map((item: string, index: number) => <th key={index}>{item}</th>)
                        }
                    </tr>
                    {
                        this.getRows().map((row: Array<{ [key: string]: any }>, index: number) => {
                            return (
                                <tr key={index}
                                    className={classNames(`${prefixCls}-datetable-row`)}
                                >
                                    {
                                        row.map((cell: { [key: string]: any }, index: number) => (
                                            <td key={index} className={this.getCellClasses(cell)}>{cell.text}</td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}