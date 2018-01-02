import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { Input } from '../input/index';
import { Transition, View } from '../libs';
import './style/select.less';

export interface SelectProps {
    prefixCls?: string;
}

export class Select extends React.Component<SelectProps, any> {

    static defaultProps = {
        prefixCls: 'wool-select'
    };

    constructor(props: SelectProps) {
        super(props);
        this.state = {
            visible: false
        }
    }
    toggleMenu() {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    }

    render() {

        const { visible } = this.state;
        return (
            <div>
                <Input
                    onChange={value => this.toggleMenu()}
                ></Input>
                <Transition name="el-zoom-in-top">
                    <View show={visible !== false}>
                        <div>111</div>
                    </View>
                </Transition>
            </div >
        )
    }
}