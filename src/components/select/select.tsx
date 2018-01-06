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
        document.addEventListener('click', this.handleClose);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClose);
    }

    handleClose = (e: any) => {
        if (!contains(this.select, e.target)) {
            this.setState({
                visible: false
            });
        }

    }

    handleOpen = (e: any) => {
        this.setState({
            visible: true
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
        const { prefixCls, children, filterable } = this.props;
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
                    onFocus={this.handleOpen}
                    readOnly={!filterable}
                    suffix={<i className={visible ? 'up-arrow' : 'down-arrow'}></i>}
                ></Input>
                <Transition name="el-zoom-in-top">
                    <View show={!!visible}>
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