import * as React from 'react';
import './style/grid.less';

export interface RowProps { compiler: string; framework: string; }

export class Row extends React.Component<RowProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}