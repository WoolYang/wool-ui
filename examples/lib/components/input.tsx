import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon, Input } from '../../../src/components/index';

export class InputDemo extends React.Component {
    render() {
        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <Input />
                <Input size="medium" />
                <Input size="small" />
                <Input size="mini" />
                <Input disabled={true} />
                <Input prefix={<Icon name="spinner6" />} placeholder="请选择日期" />
                <Input suffix={<Icon name="spinner6" />} />

                <Input addonBefore="Http://" />
                <Input addonAfter=".com" />
                <Input addonBefore="Http://" addonAfter=".com" />
            </div>
        )
    }
}