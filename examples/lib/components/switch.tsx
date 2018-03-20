import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch } from '../../../src/components/index';

export class SwitchDemo extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <Switch />
            </div>
        )
    }
}