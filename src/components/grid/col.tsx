import * as React from 'react';
import './style/grid.less';

export interface ColProps { compiler: string; framework: string; }

export class Col extends React.Component<ColProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}