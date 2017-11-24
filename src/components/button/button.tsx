import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/button.less';

export interface ButtonProps {
    size?: string;
    type?: string;
    plain?: boolean;
    round?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
    autofocus?: boolean;
    nativeType?: string;
    onClick?: React.FormEventHandler<any>;
}

class Button extends React.Component<ButtonProps, any> {

    static defaultProps = {
        size: 'default',
        type: 'default',
        plain: false,
        round: false,
        loading: false,
        disabled: false,
        icon: '',
        autofocus: false,
        nativeType: 'button'
    };

    static propTypes = {
        size: PropTypes.oneOf(['default', 'big', 'medium', 'small']),
        type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger', 'info', 'text']),
        plain: PropTypes.bool,
        round: PropTypes.bool,
        loading: PropTypes.bool,
        disabled: PropTypes.bool,
        icon: PropTypes.string,
        autofocus: PropTypes.bool,
        nativeType: PropTypes.oneOf(['button', 'submit', 'reset']),
        onClick: PropTypes.func
    };

    handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    }

    render() {
        return <button
            className="el-button"
            disabled={true}
            onClick={this.handleClick}
        >
            确认
                </button>;
    }
}

export { Button };