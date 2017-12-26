import * as React from 'react';

export interface TransitionProps { compiler: string; framework: string; }

export class Transition extends React.Component<TransitionProps, any> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}