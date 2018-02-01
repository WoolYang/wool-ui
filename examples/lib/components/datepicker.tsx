import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DatePicker } from '../../../src/components/index';

export class DatePickerDemo extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    changeDate = ({ value }: { [key: string]: any }) => {
        this.setState({ date: value });
    }

    render() {

        const { date } = this.state;
        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <DatePicker
                    value={date}
                    onChange={this.changeDate}
                    showWeekNumber={false}
                    format='YYYYMMMMDD'
                />
            </div>
        )
    }
}