import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Select, Option } from '../../../src/components/index';

export class SelectDemo extends React.Component {
    render() {
        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <Select>
                    <Option>test1</Option>
                    <Option>test2</Option>
                    <Option>test3</Option>
                    <Option>test4</Option>
                    <Option>test5</Option>
                </Select>
            </div>
        )
    }
}