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
    onChange?: any;
    onFocus?: React.FormEventHandler<any>;
    onBlur?: React.FormEventHandler<any>;
}

export class Switch extends React.Component<SwitchProps, any> {

    static defaultProps = {
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

    constructor(props: SwitchProps) {
        super(props);

        this.state = {
            checked: this.props.defaultChecked,
        };
    }

    onChange = () => {
        const { onChange, disabled } = this.props;
        const { checked } = this.state;
        if (disabled) {
            return
        }

        this.setState((prev: any) => {
            prev.checked = !prev.checked;
            return prev;
        })
        onChange && onChange({ checked: !checked })
    }

    render() {
        const { prefixCls, onContent, offContent, disabled } = this.props;
        const { checked } = this.state;
        const classes = classNames(prefixCls, {
            [`${prefixCls}-checked`]: checked,
            [`${prefixCls}-disabled`]: disabled
        }

        );

        return (
            <span className={classes} onClick={this.onChange}>
                <span className={`${prefixCls}-inner`}>{checked ? onContent : offContent}</span>
            </span>
        )
    }
}