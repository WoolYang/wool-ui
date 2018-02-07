import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import {
    SELECTION_MODE,
    isFunction
} from "../utils/index";

export type SelectionMode = 'year' | 'month' | 'week' | 'day';
export interface YearViewProps {
    selectionMode?: SelectionMode;   //日期类型
    date?: Date; //日期
    prefixCls?: string;
    onPick?: any;
    disabledDate?: any
}

export default class YearView extends React.Component<YearViewProps, any> {

    static defaultProps = {
        prefixCls: 'wool-datepicker'
    }

    static propTypes = {
        selectionMode: PropTypes.oneOf(['year', 'month', 'week', 'day']),
        date: PropTypes.instanceOf(Date).isRequired,
        onPick: PropTypes.func,
        disabledDate: PropTypes.func
    };

    getCellStyle(year: number) {
        const { date, disabledDate } = this.props;

        const ndate = new Date(date);
        ndate.setFullYear(year);
        const cellClass = classNames({
            ['current']: date && date.getFullYear() == year,
            ['disabled']: isFunction(disabledDate) && disabledDate(ndate, SELECTION_MODE.YEAR)
        });
        return cellClass;
    }

    handleClick = (e: any) => {
        const target = e.target;
        const { date, onPick } = this.props;
        if (target.tagName !== 'A') return;
        if (target.parentNode.classList.contains('disabled')) return;
        const year = target.textContent || target.innerText;
        if (year === '') return
        const newDate = new Date(date);
        newDate.setFullYear(year)
        onPick(newDate)
    }

    getYearList() {
        const { date } = this.props;
        const startYear: number = Math.floor(date.getFullYear() / 10) * 10;
        let yearList: Array<string | number> = ['', ''];
        for (let i = 9; i >= 0; i--) {
            yearList.push(startYear + i)
        }
        return yearList.reverse()
    }

    render() {
        const { selectionMode, prefixCls } = this.props;
        return (
            <table
                className={classNames(`${prefixCls}-yeartable`)}
                onClick={this.handleClick}
            >
                <tbody>
                    {
                        this.getYearList().map((key, idx) => {
                            return (
                                <td key={idx} className={this.getCellStyle(Number(key))}>
                                    {key && <a className="cell">{key}</a>}
                                </td>
                            )
                        }).reduce((col, item) => {
                            let tararr
                            if (!(Array.isArray(col[0]) && col[0].length !== 4)) {
                                col.unshift([])
                            }
                            tararr = col[0]
                            tararr.push(item)
                            return col
                        }, []).reverse().map((e, idx) => <tr key={idx}>{e}</tr>)
                    }
                </tbody>
            </table>
        )
    }
}