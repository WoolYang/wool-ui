import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface ViewProps {
    show?: boolean;
    children?: React.ReactElement<any>;
}

export class View extends React.Component<ViewProps, any> {
    render() {
        const style = this.props.hasOwnProperty('show') && !this.props.show && {
            display: 'none'
        };

        return React.cloneElement(React.Children.only(this.props.children), {
            style: Object.assign({}, this.props.children.props.style, style)
        });
    }
}