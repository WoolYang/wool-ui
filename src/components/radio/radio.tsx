import * as React from 'react';
import * as PropTypes from 'prop-types';
import './style/radio.less';

export interface RadioProps {
    prefixCls?: string;
    checked?: boolean;
    value?: string | number | boolean;
    disabled?: boolean;
}

export class Radio extends React.Component<RadioProps, any> {

    static defaultProps = {
        checked: false,
        disabled: false,
        prefixCls: 'wool-radio'
    };

    static propTypes = {
        checked: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        disabled: PropTypes.bool,
    };


    render() {

        const {
            prefixCls,
            checked,
            disabled,
            value,
            children
        } = this.props;

        return (
            <label>
                <span>
                    <input
                        type="radio"
                        className={`${prefixCls}-input`}
                        checked={checked}
                        disabled={disabled}
                    />
                    <span></span>
                </span>
                <span>{children || value}</span>
            </label>
        )
    }
}