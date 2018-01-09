import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Select, Option } from '../../../src/components/index';

export interface SelectDemoProps {
    value?: string | number | boolean;
}
export class SelectDemo extends React.Component<SelectDemoProps, any> {

    constructor(props: Object) {
        super(props);
        this.state = {
            value1: '',
            value2: '',
            options: [
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' },
                { label: '选项3', value: '3' },
                { label: '选项4', value: '4' }
            ],
            options1: [
                { label: 'x', value: 'x' },
                { label: 'xx', value: 'xx' },
                { label: 'xxx', value: 'xxx' },
                { label: 'xxxx', value: 'xxxx' }
            ]
        }
    }

    handleChange = ({ value }: any) => {
        this.setState({ value: value })
    }

    render() {
        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <Select value={this.state.value1} onChange={this.handleChange}>
                    {
                        this.state.options.map((item: any, index: number) => {
                            return <Option key={index} value={item.value}>{item.label}</Option>
                        })
                    }
                </Select>
                <Select value={this.state.value2} onChange={this.handleChange} clearable={true}>
                    {
                        this.state.options1.map((item: any, index: number) => {
                            return <Option key={index} value={item.value}>{item.label}</Option>
                        })
                    }
                </Select>
            </div>
        )
    }
}