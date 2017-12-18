import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/radio.less';

export interface RadioButtonProps {
    prefixCls?: string;
    checked?: boolean;
    value?: string | number | boolean;
    disabled?: boolean;
    onChange?: any;
    model?: string | number | boolean;
}

export class RadioButton extends React.Component<RadioButtonProps, any> {

    static defaultProps = {
        checked: false,
        disabled: false,
        prefixCls: 'wool-radio-button'
    };

    static propTypes = {
        checked: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        model: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            checked: this.getChecked(props)
        };
    }

    componentWillReceiveProps(nextProps: Object) {
        const checked = this.getChecked(nextProps);

        if (this.state.checked != checked) {
            this.setState({ checked });
        }
    }

    getChecked(props: RadioButtonProps): boolean {
        return props.model == props.value || Boolean(props.checked)
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        const { onChange, value } = this.props;
        if (onChange && checked) {
            onChange(value);
        }
        this.setState({ checked });
    }


    render() {

        const {
            prefixCls,
            disabled,
            value,
            children
        } = this.props;

        const { checked } = this.state;

        const classes = classNames(
            `${prefixCls}`,
            checked && `${prefixCls}-checked`,
            disabled && `${prefixCls}-disabled`,
        )

        return (
            <label className={classes} >
                <span className={`${prefixCls}-wrapper`}>
                    <input
                        type="radio"
                        className={`${prefixCls}-input`}
                        checked={checked}
                        disabled={disabled}
                        onChange={this.handleChange}
                    />
                </span>
                <span className={`${prefixCls}-label`} >{children || value}</span>
            </label>
        )
    }
}