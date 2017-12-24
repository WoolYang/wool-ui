import * as React from 'react';
import './style/select.less';

export interface SelectProps { compiler: string; framework: string; }

export class Select extends React.Component<SelectProps, any> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}