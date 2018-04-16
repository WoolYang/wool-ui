import * as React from 'react';
import './style/table.less';

export interface TableProps {
    style?: object;
    data?: object;
}

export class Table extends React.Component<TableProps, any> {
    render() {
        return <h1>Hello from  and !</h1>;
    }
}