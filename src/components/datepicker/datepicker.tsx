import * as React from 'react';
import './style/datePicker.less';

export interface DatePickerProps {
    compiler: string;
    framework: string;
}

export class DatePicker extends React.Component<DatePickerProps, any> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}