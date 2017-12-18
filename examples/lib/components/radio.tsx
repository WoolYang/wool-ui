import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello, Radio } from '../../../src/components/index';

export interface RadioDemoProps {
    value?: string | number | boolean;
}
export class RadioDemo extends React.Component<RadioDemoProps, any> {

    constructor(props: Object) {
        super(props);

        this.state = {
            value: 1
        }
    }

    onChange(value: any) {
        this.setState({ value });
    }

    render() {
        const { value } = this.state;
        return (
            <div style={{ width: '200px', margin: '0 auto' }} >
                <Radio value="1" checked={this.state.value == 1} onChange={this.onChange.bind(this)} >选项1</Radio>
                <Radio value="2" checked={this.state.value == 2} onChange={this.onChange.bind(this)} >选项2</Radio>
            </div>
        )
    }
}