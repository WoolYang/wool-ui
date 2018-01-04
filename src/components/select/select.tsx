import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { Input } from '../input/index';
import { Transition, View } from '../libs';
import { contains } from '../libs/utils/utils';
import './style/select.less';

export interface SelectProps {
    prefixCls?: string;
}

export class Select extends React.Component<SelectProps, any> {

    [x: string]: any;  //标签索引，否则el会未定义

    static defaultProps = {
        prefixCls: 'wool-select'
    };

    constructor(props: SelectProps) {
        super(props);
        this.state = {
            visible: false
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

    render() {
        const { prefixCls, children } = this.props;
        const { visible } = this.state;
        return (
            <div ref={c => this.select = c}>
                <Input
                    onFocus={this.handleOpen}
                ></Input>
                <Transition name="el-zoom-in-top">
                    <View show={visible !== false}>
                        <div>
                            <ul>
                                {children}
                            </ul>
                        </div>
                    </View>
                </Transition>
            </div >
        )
    }
}