import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

export interface TransitionProps {
    name: string;
    onEnter: string;
    onAfterEnter: React.FormEventHandler<any>;
    onLeave: string;
    onAfterLeave: React.FormEventHandler<any>
}

export class Transition extends React.Component<TransitionProps, any> {
    render() {
        return this.state.children;
    }
}