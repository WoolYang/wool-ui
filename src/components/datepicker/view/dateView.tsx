import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

export type SelectionMode = 'year' | 'month' | 'week' | 'day';
export interface DateViewProps {
    selectionMode?: SelectionMode;   //日期类型
}
export default class DateView extends React.Component<DateViewProps, any> {

    static propTypes = {
        selectionMode: PropTypes.oneOf(['year', 'month', 'week', 'day']),
    };
    render() {
        return (
            <div>DateView</div>
        )
    }
}