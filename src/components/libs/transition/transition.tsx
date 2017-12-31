import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

export interface TransitionProps {
    name?: string;
    onEnter?: string;
    onAfterEnter?: React.FormEventHandler<any>;
    onLeave?: string;
    onAfterLeave?: React.FormEventHandler<any>;
    children?: React.ReactElement<any>;
}

export class Transition extends React.Component<TransitionProps, any> {

    [x: string]: any;

    constructor(props: TransitionProps) {
        super(props);

        this.state = {
            children: props.children && this.enhanceChildren(props.children, props)
        }

        /*         this.didEnter = this.didEnter.bind(this);
                this.didLeave = this.didLeave.bind(this); */
    }

    enhanceChildren(children: React.ReactElement<any>, props: TransitionProps) {
        return React.cloneElement(children, Object.assign({ ref: (el: any) => { this.el = el } }, props))
    }

    render() {
        return this.state.children;
    }
}