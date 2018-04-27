import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Transition, View } from '../libs';

import './style/message.less';
export default class Toast extends React.Component<any, any> {

    [x: string]: any;

    static propTypes = {
        type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
        duration: PropTypes.number,
        showClose: PropTypes.bool,
        customClass: PropTypes.string,
        iconClass: PropTypes.string,
        prefixCls: PropTypes.string
    }

    static defaultProps = {
        prefixCls: 'wool-message',
        type: 'info',
        duration: 3000,
        showClose: false
    }

    constructor(props: any) {
        super(props);

        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.setState({ visible: true })
        this.startTimer();
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    onClose = () => {
        this.stopTimer();
        this.setState({ visible: false });
    }

    startTimer = () => {
        if (this.props.duration > 0) {
            this.timeout = setTimeout(() => {
                this.onClose();
            }, this.props.duration)
        }
    }

    stopTimer = () => {
        clearTimeout(this.timeout);
    }

    render() {
        const { iconClass, customClass, prefixCls, message, showClose, type } = this.props;

        return (
            <Transition name={`${prefixCls}-fade`} onLeave={() => { this.props.willUnmount(); }}>
                <View show={this.state.visible}>
                    <div className={classNames(`${prefixCls}`, customClass)} onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer}>

                        <div className={classNames(`${prefixCls}__group ${type}`, { 'is-with-icon': iconClass })}>
                            {
                                iconClass ? <i className={classNames(`${prefixCls}__icon`, iconClass)}></i> :
                                    <i className={classNames(`${prefixCls}__icon`, iconClass)}></i>
                            }
                            <p>{message}</p>
                            {showClose && <div className={`${prefixCls}_icon-close`} onClick={this.onClose}></div>}
                        </div>
                    </div>
                </View>
            </Transition>
        )
    }

}