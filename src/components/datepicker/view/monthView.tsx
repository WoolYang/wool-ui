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

    constructor(props: MonthViewProps) {
        super(props)

        this.state = {
            tableRows: [[], [], [], []],
        }
    }

    render() {

        const { selectionMode, prefixCls } = this.props;
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

        return (
            <table
                className={classNames(`${prefixCls}-monthtable`)}
            /*  onClick={this.handleClick} */
            >
                <tbody>
                    {
                        months.map((key, idx) => {
                            return (
                                <td key={idx}>
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