import * as React from 'react';
import { Checkbox, CheckboxGroup } from '../../../src/components/index';

export interface CheckboxDemoProps {
    value?: string | number | boolean;
}
export class CheckboxDemo extends React.Component<CheckboxDemoProps, any> {

    constructor(props: Object) {
        super(props);

        this.state = {
            value: ['1', '2'],
            showAllValue: ['3'],
            aliasValue: ['4'],
            options: [
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' },
                { label: '选项3', value: '3' },
                { label: '选项4', value: '4' }
            ],
            aliasOptions: [
                { id: '1', text: '选项1' },
                { id: '2', text: '选项2' },
                { id: '3', text: '选项3' },
                { id: '4', text: '选项4' }
            ]
        }
    }

    onChange(value: any) {
        this.setState({ value });
    }

    onChangeShowAll(showAllValue: any) {
        this.setState({ showAllValue });
    }

    onChangeAlias(aliasValue: any) {
        this.setState({ aliasValue });
    }

    render() {
        const { value, groupValue, buttonValue } = this.state;
        return (
            <div>
                <div style={{ width: '200px', margin: '20px auto' }} >
                    <Checkbox checked={true} >选项1</Checkbox>
                    <Checkbox checked={false} >选项2</Checkbox>
                    <Checkbox disabled={true} >选项3</Checkbox>
                    <Checkbox checked={true} disabled={true} >选项4</Checkbox>
                </div>
                <div style={{ width: '200px', margin: '20px auto' }} >
                    <CheckboxGroup
                        onChange={this.onChange.bind(this)}
                        value={this.state.value}
                        options={this.state.options}
                    />
                </div>
                <div style={{ width: '200px', margin: '20px auto' }} >
                    <CheckboxGroup
                        onChange={this.onChangeShowAll.bind(this)}
                        showAll={true}
                        value={this.state.showAllValue}
                        options={this.state.options}
                    />
                </div>
                <div style={{ width: '200px', margin: '20px auto' }} >
                    <CheckboxGroup
                        onChange={this.onChangeAlias.bind(this)}
                        showAll={true}
                        value={this.state.aliasValue}
                        optionsAlias={{ label: 'text', value: 'id' }}
                        options={this.state.aliasOptions}
                    />
                </div>
            </div>
        )
    }
}