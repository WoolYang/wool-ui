import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import {
    WEEKS,
    DAY_DURATION,
    getFirstDayOfMonth,
    getDayCountOfMonth,
    getStartDateCellOfMonth,
    clearHours,
    getWeekNumber
} from "../utils/index";

export type SelectionMode = 'year' | 'month' | 'week' | 'day';
export interface DateViewProps {
    selectionMode?: SelectionMode;   //日期类型
    showWeekNumber?: boolean;     //是否展示周数
    date?: Date; //日期
}

export default class DateView extends React.Component<DateViewProps, any> {

    static propTypes = {
        selectionMode: PropTypes.oneOf(['year', 'month', 'week', 'day']),
        showWeekNumber: PropTypes.bool,
        date: PropTypes.instanceOf(Date).isRequired
    };

    constructor(props: DateViewProps) {
        super(props)

        this.state = {
            tableRows: [[], [], [], [], [], []],
            firstDayOfWeek: 0 //每周日期偏移，周日0，周六6
        }
    }

    componentDidMount() {
        this.getRows();
    }

    //表格行列计算
    getRows() {
        const { date, showWeekNumber, selectionMode } = this.props;
        const { tableRows, firstDayOfWeek } = this.state;
        //获取当前选择日期
        const ndate = new Date(date.getTime());
        //获取当月的第一天
        let day = getFirstDayOfMonth(ndate);
        //获取当月天数
        const dateCountOfMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth());
        //获取上月天数，1月的上月为12月
        const dateCountOfLastMonth = getDayCountOfMonth(ndate.getFullYear(), (ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1));

        const rows = tableRows;
        let count = 1;
        let firstDayPosition;
        //获得单元格第一个日期
        const startDate = getStartDateCellOfMonth(ndate.getFullYear(), ndate.getMonth(), firstDayOfWeek);
        //当前日期，时间置零
        const now = clearHours(new Date());

        for (var i = 0; i < 6; i++) {
            const row = rows[i]; //一行
            if (showWeekNumber) {//是否显示周号
                if (!row[0]) {
                    //获取周号，参数为根据startDate计算每行起始天数
                    row[0] = { type: 'week', text: getWeekNumber(new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))) };
                }
            }
            console.log(row)
        }
    }


    //获取行
    getMarkedRangeRows() {

    }

    render() {
        return (
            <table
                cellSpacing="0"
                cellPadding="0"
            >
                <tbody>
                    <tr>
                        {
                            WEEKS.map((item, index) => <th key={index}>{item}</th>)
                        }
                    </tr>
                </tbody>
            </table>
        )
    }
}