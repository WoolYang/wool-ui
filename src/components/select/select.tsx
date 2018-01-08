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
}

export class Select extends React.Component<SelectProps, any> {

    [x: string]: any;  //标签索引，否则el会未定义

    static defaultProps = {
        prefixCls: 'wool-select',
        filterable: false
    };

    static propTypes = {
        filterable: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        onChange: PropTypes.func
    }

    constructor(props: SelectProps) {
        super(props);
        this.state = {
            visible: false,
            selectedLabel: ''
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

    render() {

        console.log(this)
        const { prefixCls, children, filterable, value } = this.props;
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
                    value={selectedLabel}
                    readOnly={!filterable}
                    suffix={<i className={visible ? 'up-arrow' : 'down-arrow'}></i>}
                    onClick={this.handleToggle}
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