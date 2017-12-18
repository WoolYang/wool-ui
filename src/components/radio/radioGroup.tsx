import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';

export interface RadioGroupProps {
    prefixCls?: string;
    value?: string | number | boolean;
    onChange?: any;
    children?: React.ReactNode;
}

export class RadioGroup extends React.Component<RadioGroupProps, any> {

    static defaultProps = {
        prefixCls: 'wool-radio-group'
    };

    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        onChange: PropTypes.func
    };

    handleChange = (value: any) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    }


    render() {

        const {
            prefixCls,
            value,
            children
        } = this.props;

        return (
            <div className={`${prefixCls}`} >
                {
                    React.Children.map(children, (element: any) => {
                        if (!element) {
                            return null;
                        }

                        const { name } = element.type;
                        if (name !== 'Radio' && name !== 'RadioButton') {
                            return null;
                        }

                        return React.cloneElement(element, Object.assign({}, element.props, {
                            onChange: this.handleChange,
                            model: value
                        }))
                    })
                }
            </div>
        )
    }
}