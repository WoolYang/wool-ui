import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import './style/radio.less';

export interface RadioProps {
    prefixCls?: string;
    checked?: boolean;
    value?: string | number | boolean;
    disabled?: boolean;
    onChange?: any;
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

    getChecked(props: RadioProps): boolean {
        return Boolean(props.checked)
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
            `${prefixCls}-wrapper`,
            checked && `${prefixCls}-checked`
        )

        return (
            <label className={`${prefixCls}`} >
                <span className={classes}>
                    <input
                        type="radio"
                        className={`${prefixCls}-input`}
                        checked={checked}
                        disabled={disabled}
                        onChange={this.handleChange}
                    />
                    <span className={`${prefixCls}-inner`} ></span>
                </span>
                <span>{children || value}</span>
            </label>
        )
    }
}