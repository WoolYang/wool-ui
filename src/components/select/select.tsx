import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Input } from '../input/index';
import { Transition, View } from '../libs';
import { contains } from '../libs/utils/utils';
import './style/select.less';

export interface SelectProps {
    prefixCls?: string;
    filterable?: boolean;
    value?: string | number | boolean;
    onChange?: any;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
    clearable?: boolean;
}

export class Select extends React.Component<SelectProps, any> {

    [x: string]: any;  //标签索引，否则el会未定义

    static defaultProps = {
        prefixCls: 'wool-select',
        filterable: false,
        disabled: false,
        clearable: false,
        placeholder: '请选择'
    };

    static propTypes = {
        filterable: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        name: PropTypes.string,
        clearable: PropTypes.bool
    }

    constructor(props: SelectProps) {
        super(props);
        this.state = {
            visible: false,
            selectedLabel: '',
            selectedValue: '',
            inputHover: false
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutClose);

        React.Children.map(this.props.children, (element: any) => {
            if (this.props.value === element.props.value) {
                this.setState({
                    selectedLabel: element.props.children,
                    selectedValue: element.props.value,
                })
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutClose);
    }

    //点击外元素关闭事件
    handleOutClose = (e: any) => {
        if (!contains(this.select, e.target)) {
            this.setState({
                visible: false
            });
        }

    }

    //切换下拉框显示
    handleToggle = (e?: any) => {
        this.setState((prev: any) => {
            prev.visible = !this.state.visible;
            return prev;
        });
    }

    //选择值处理
    handleChange = ({ value, label }: any) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange({ value, label });
        }
        this.setState({
            visible: false,
            selectedLabel: label,
            selectedValue: value
        });
    }

    //鼠标进入事件
    handleMouseEnter = () => {
        this.setState({ inputHover: true })
    }

    //鼠标移出事件
    handleMouseLeave = () => {
        this.setState({ inputHover: false })
    }

    //清除选中项事件
    clearSelected = () => {
        const { onChange } = this.props;
        if (onChange) {
            onChange({ value: '', label: '' });
        }
        this.setState({
            visible: false,
            selectedLabel: '',
            selectedValue: ''
        });
    }

    //icon点击事件
    handleIconClick = () => {
        if (this.iconClass().indexOf('close-icon') > -1) {
            this.clearSelected();
        }
    }

    //icon样式计算
    iconClass() {
        const { clearable } = this.props;
        const { visible, inputHover, selectedLabel } = this.state;

        return clearable && !visible && inputHover && Boolean(selectedLabel) ?
            'close-icon' :
            visible ? 'up-arrow' : 'down-arrow'

    }

    render() {

        const { prefixCls, children, filterable, value, disabled, placeholder, name } = this.props;
        const { visible, selectedLabel, selectedValue } = this.state;

        const options = React.Children.map(children, (element: any) => {
            if (!element) {
                return null;
            }

            return React.cloneElement(
                element,
                Object.assign({
                    onChange: this.handleChange,
                    selectedValue: selectedValue
                }, element.props));
        });

        return (
            <div ref={c => this.select = c}
                className={prefixCls}
            >
                <Input
                    name={name}
                    value={selectedLabel}
                    readOnly={!filterable}
                    suffix={<i className={this.iconClass()} onClick={this.handleIconClick} onMouseEnter={this.handleMouseEnter} />}
                    onClick={this.handleToggle}
                    disabled={disabled}
                    placeholder={placeholder}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                ></Input>
                <Transition name={prefixCls} >
                    <View show={visible}>
                        <div className={`${prefixCls}-dropdown`} >
                            <ul>
                                {options}
                            </ul>
                        </div>
                    </View>
                </Transition>
            </div >
        )
    }
}