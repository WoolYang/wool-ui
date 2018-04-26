import * as React from 'react';
import { Switch } from '../../../src/components/index';

export class SwitchDemo extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    onChange = ({ checked }: any) => {
        console.log(`switch to ${checked}`);
    }

    render() {
        return (
            <div>
                <div style={{ width: '200px', margin: '0 auto' }}>
                    <Switch onChange={this.onChange} />
                </div>
                <div style={{ width: '200px', margin: '0 auto' }}>
                    <Switch disabled={true} defaultChecked={true} onChange={this.onChange} />
                </div>
            </div>
        )
    }
}