import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Radio, RadioGroup, RadioButton } from '../../../src/components/index';

export interface RadioDemoProps {
    value?: string | number | boolean;
}
export class RadioDemo extends React.Component<RadioDemoProps, any> {

    constructor(props: Object) {
        super(props);

        this.state = {
            value: 4,
            groupValue: 1,
            buttonValue: 1
        }
    }

    onChange(value: any) {
        this.setState({ value });
    }

    onChangeGroup(groupValue: any) {
        this.setState({ groupValue });
    }

    onChangeButton(buttonValue: any) {
        this.setState({ buttonValue });
    }

    render() {
        const { value, groupValue, buttonValue } = this.state;
        return (
            <div>
                <div style={{ width: '200px', margin: '10px auto' }} >
                    <Radio value="1" checked={this.state.value == 1} onChange={this.onChange.bind(this)} >选项1</Radio>
                    <Radio value="2" checked={this.state.value == 2} onChange={this.onChange.bind(this)} >选项2</Radio>
                    <Radio value="3" checked={this.state.value == 3} onChange={this.onChange.bind(this)} >选项3</Radio>
                    <Radio value="4" disabled={true} checked={this.state.value == 4} onChange={this.onChange.bind(this)} >选项4</Radio>
                </div>

                <div style={{ width: '200px', margin: '10px auto' }} >
                    <RadioGroup value={groupValue} onChange={this.onChangeGroup.bind(this)} >
                        <Radio value="1" >选项1</Radio>
                        <Radio value="2" >选项2</Radio>
                        <Radio value="3" >选项3</Radio>
                        <Radio value="4" >选项4</Radio>
                    </RadioGroup>
                </div>
                <div style={{ width: '200px', margin: '20px auto' }} >
                    <RadioGroup value={buttonValue} onChange={this.onChangeButton.bind(this)} >
                        <RadioButton value="1" >选项1</RadioButton>
                        <RadioButton value="2" >选项2</RadioButton>
                        <RadioButton value="3" >选项3</RadioButton>
                        <RadioButton value="4" disabled={true} >选项4</RadioButton>
                    </RadioGroup>
                </div>
            </div>
        )
    }
}