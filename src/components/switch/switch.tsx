import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/switch.less';

export interface SwitchProps {
    prefixCls?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onContent?: any;
    offContent?: any;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FormEventHandler<any>;
    onBlur?: React.FormEventHandler<any>;
}

export class Switch extends React.Component<SwitchProps, any> {

    static defaultProps = {
        defaultChecked: true,
        onContent: 'on',
        offContent: 'off',
        disabled: false,
        prefixCls: 'wool-switch',
    }

    static propTypes = {
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        onContent: PropTypes.any,
        offContent: PropTypes.any,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };
    render() {
        const { prefixCls, checked, onContent, offContent } = this.props;
        const classes = classNames(
            prefixCls
        );

        return (
            <span className={classes}>
                <span className={`${prefixCls}-inner`}>{checked ? onContent : offContent}</span>
            </span>
        )
    }
}