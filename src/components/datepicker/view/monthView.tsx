import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import {
    SELECTION_MODE,
} from "../utils/index";

export type SelectionMode = 'year' | 'month' | 'week' | 'day';
export interface MonthViewProps {
    selectionMode?: SelectionMode;   //日期类型
    date?: Date; //日期
    prefixCls?: string;
    onPick?: any;
}

export default class MonthView extends React.Component<MonthViewProps, any> {

    static defaultProps = {
        prefixCls: 'wool-datepicker'
    }

    static propTypes = {
        selectionMode: PropTypes.oneOf(['year', 'month', 'week', 'day']),
        date: PropTypes.instanceOf(Date).isRequired,
        onPick: PropTypes.func,
    };

    getCellStyle(month: number) {
        const { date } = this.props
        //    const ndate = new Date(date)
        //   ndate.setMonth(month);

        //   style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, SELECTION_MODES.MONTH);

        const cellClass = classNames({
            ['current']: date && date.getMonth() === month
        });

        return cellClass;
    }

    handleClick = (e: any) => {
        const target = e.target;
        const { date, onPick } = this.props;
        if (target.tagName !== 'A') return;
        if (target.parentNode.classList.contains('disabled')) return;
        const column = target.parentNode.cellIndex;
        const row = target.parentNode.parentNode.rowIndex;
        const month = row * 4 + column;

        const newDate = new Date(date);
        newDate.setMonth(month)
        onPick(newDate)
    }

    render() {

        const { selectionMode, prefixCls } = this.props;
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

        return (
            <table
                className={classNames(`${prefixCls}-monthtable`)}
                onClick={this.handleClick}
            >
                <tbody>
                    {
                        months.map((key, idx) => {
                            return (
                                <td key={idx} className={this.getCellStyle(idx)}>
                                    <a className="cell">{key}</a>
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