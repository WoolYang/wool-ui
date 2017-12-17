import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello, Radio } from '../../../src/components/index';

export class RadioDemo extends React.Component {
    render() {
        return (
            <div style={{ width: '200px', margin: '0 auto' }} >
                <Radio>123</Radio>
            </div>
        )
    }
}