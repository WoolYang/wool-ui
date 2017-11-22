import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style/button.less';

export interface HelloProps { compiler: string; framework: string; }

export class Button extends React.Component<HelloProps, undefined> {
    render() {
        return <h1>Button from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}