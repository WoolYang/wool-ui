import * as React from 'react';
import './style/switch.less';

export interface SwitchProps { compiler: string; framework: string; }

export class Switch extends React.Component<SwitchProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}