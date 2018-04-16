import * as React from 'react';
import './style/table.less';

export interface TableProps {
    compiler?: string;
    framework?: string;
}

export class Table extends React.Component<TableProps, any> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}