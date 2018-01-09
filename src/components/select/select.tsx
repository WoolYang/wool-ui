import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
            inputHover: false
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutClose);

        React.Children.map(this.props.children, (element: any) => {
            if (this.props.value === element.props.value) {
                this.setState({ selectedLabel: element.props.children })
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutClose);
    }

    handleOutClose = (e: any) => {
        if (!contains(this.select, e.target)) {
            this.setState({
                visible: false
            });
        }

    }

    handleToggle = (e: any) => {
        this.setState((prev: any) => {
            prev.visible = !this.state.visible;
            return prev;
        });
    }

    handleChange = ({ value, label }: any) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange({ value, label });
        }
        this.setState({
            visible: false,
            selectedLabel: label
        });
    }

    handleMouseEnter = () => {
        this.setState({ inputHover: true })
    }

    handleMouseLeave = () => {
        this.setState({ inputHover: false })
    }

    clearSelected = () => {
        const { onChange } = this.props;
        if (onChange) {
            onChange({ value: '', label: '' });
        }
        this.setState({
            visible: false,
            selectedLabel: ''
        });
    }

    iconElement() {
        const { clearable } = this.props;
        const { visible, inputHover, selectedLabel } = this.state;

        return clearable && !visible && inputHover && Boolean(selectedLabel) ?
            <i className={'close-icon'} onClick={this.clearSelected} /> :
            <i className={visible ? 'up-arrow' : 'down-arrow'} />

    }

    render() {

        const { prefixCls, children, filterable, value, disabled, placeholder, name } = this.props;
        const { visible, selectedLabel } = this.state;

        const options = React.Children.map(children, (element: any) => {
            if (!element) {
                return null;
            }

            return React.cloneElement(
                element,
                Object.assign({
                    onChange: this.handleChange
                }, element.props));
        });

        return (
            <div ref={c => this.select = c} className={prefixCls} >
                <Input
                    name={name}
                    value={selectedLabel}
                    readOnly={!filterable}
                    suffix={this.iconElement()}
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