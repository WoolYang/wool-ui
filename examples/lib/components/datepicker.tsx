import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DatePicker } from '../../../src/components/index';

export class DatePickerDemo extends React.Component {
    render() {
        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <DatePicker />
            </div>
        )
    }
}