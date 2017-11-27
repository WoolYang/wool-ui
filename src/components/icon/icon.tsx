import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/icon.less';

export interface IconProps {
    name?: string;
    spin?: boolean;
    onClick?: React.MouseEventHandler<any>;
    className?: string;
    style?: React.CSSProperties;
}

class Icon extends React.Component<IconProps, any> {

    static defaultProps = {
        name: '',
        spin: false,
        className: '',
        style: {}
    };

    static propTypes = {
        name: PropTypes.string,
        spin: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object
    };

    render() {
        const { name, spin, className, style } = this.props;
        const classes = classNames(
            className,
            `icon-${name}`,
            spin && `icon-style-spin`
        );

        return <i className={classes} style={style} />;
    }
}

export { Icon };