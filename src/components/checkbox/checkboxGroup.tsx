import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { Checkbox } from './checkbox';

export interface CheckboxOptionsAlias {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    prefixCls?: string;
    value?: Array<string | number>;
    options?: Array<object | string>;
    optionsAlias?: CheckboxOptionsAlias;
    showAll?: boolean;
    showAllName?: string;
    min?: number,
    max?: number,
    onChange?: any;
    children?: React.ReactNode;
}

export class CheckboxGroup extends React.Component<CheckboxGroupProps, any> {

    static propTypes = {
        value: PropTypes.array, //选中值
        options: PropTypes.array, //带选项
        optionsAlias: PropTypes.object, //别名
        showAll: PropTypes.bool, //显示全选
        showAllName: PropTypes.string, //全选名称
        min: PropTypes.number, //最小值
        max: PropTypes.number, //最大值
        onChange: PropTypes.func
    };

    static defaultProps = {
        prefixCls: 'wool-checkbox-group',
        showAll: false,
        showAllName: '全部',
        optionsAlias: {
            label: 'label',
            value: 'value',
            disabled: false
        },
    };

    constructor(props: CheckboxGroupProps) {
        super(props);
        this.state = {
            value: props.value || [],
            indeterminate: false
        };
    }

    componentWillReceiveProps(nextProps: CheckboxGroupProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value || [],
            });
        }
    }

    getOptions() {
        const { options, optionsAlias } = this.props;
        return (options as Array<any>).map(option => {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option
                } as CheckboxOptionsAlias;
            }

            return {
                label: option[optionsAlias.label],
                value: option[optionsAlias.value],
                disabled: !!option.disabled || optionsAlias.disabled
            } as CheckboxOptionsAlias;
        });
    }

    handleChange = (option: CheckboxOptionsAlias) => {
        const { onChange } = this.props;
        const optionIndex = this.state.value.indexOf(option.value);
        const value = [...this.state.value];
        if (optionIndex === - 1) {
            value.push(option.value);
        } else {
            value.splice(optionIndex, 1);
        }
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        if (onChange) {
            onChange(value);
        }
    }

    handleChangeAll = () => {
        const { value, options, onChange } = this.props;
        const allValue = this.getOptions().map(item => {
            return item.value;
        })

        if (value.length === options.length) {
            this.setState({ value: [] });
            if (onChange) {
                onChange([]);
            }
        } else if (value.length <= options.length) {
            this.setState({ value: allValue });
            if (onChange) {
                onChange(allValue);
            }
        }
    }

    render() {
        const {
            prefixCls,
            value,
            showAll,
            showAllName,
            options
        } = this.props;

        return (
            <div className={`${prefixCls}`} >
                {
                    showAll && (<Checkbox
                        value="all"
                        checked={value.length === options.length}
                        indeterminate={value.length > 0 && (value.length < options.length)}
                        onChange={this.handleChangeAll}
                    >
                        {showAllName}
                    </Checkbox>)
                }
                {
                    this.getOptions().map(option => (
                        <Checkbox
                            key={option.value}
                            disabled={option.disabled}
                            value={option.value}
                            checked={value.indexOf(option.value) !== -1}
                            onChange={() => this.handleChange(option)}
                        >
                            {option.label}
                        </Checkbox>
                    ))
                }
            </div>
        )
    }
}