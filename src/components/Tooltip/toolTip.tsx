import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import Popover from './popover';
import './style/tooltip.less';

export type Placement = 'left' | 'right' | 'top' | 'bottom';
export type Trigger = 'click' | 'hover';

export interface AbstractPopperProps {
    prefixCls?: string;
    title?: string | React.ReactNode;
    content?: string | React.ReactNode;
    placement?: Placement;
    style?: React.CSSProperties;
    visibleArrow?: boolean;
}

export interface TooltipProps extends AbstractPopperProps {
    trigger?: Trigger;
    hideTrigger?: Trigger;
    openDelay?: number;
}

export class Tooltip extends React.Component<TooltipProps, any>{

    [x: string]: any;

    static propTypes = {
        prefixCls: PropTypes.string,
        title: PropTypes.any,
        content: PropTypes.any,
        placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        style: PropTypes.object,
        visibleArrow: PropTypes.bool,
        trigger: PropTypes.oneOf(['click', 'hover']),
        hideTrigger: PropTypes.oneOf(['click', 'hover']),
        openDelay: PropTypes.number
    }

    static defaultProps = {
        prefixCls: 'wool-popover',
        trigger: 'hover',
        hideTrigger: 'hover',
        placement: "left",
        visibleArrow: true,
        openDelay: 0
    }

    componentWillUnmount() {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

    getPosition() {
        const domNode: any = ReactDOM.findDOMNode(this)
        let { placement } = this.props;
        let { right, left, top, bottom, width, height } = domNode.getBoundingClientRect();
        let { clientHeight, clientWidth } = this.container;
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        top += scrollTop;
        left += scrollLeft;
        right += scrollLeft;
        bottom += scrollTop;
        if (placement === 'left') {
            this.style = {
                left: left - clientWidth + 'px',
                top: top + (height / 2 - clientHeight / 2) + 'px'
            }
        } else if (placement === 'right') {
            this.style = {
                left: right + 'px',
                top: top + (height / 2 - clientHeight / 2) + 'px'
            }
        } else if (placement === 'top') {
            this.style = {
                top: top - clientHeight + 'px',
                left: left + (width / 2 - clientWidth / 2) + 'px'
            }
        } else if (placement === 'bottom') {
            this.style = {
                top: bottom + 'px',
                left: left + (width / 2 - clientWidth / 2) + 'px'
            }
        }
        this.style.visibility = "visible";
    }

    createComponent = () => {
        const { prefixCls, content } = this.props;
        //创建提示框
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = `${prefixCls}-wrapper${content ? '' : ` ${prefixCls}-wrapper_ctn`}`;
            document.body.appendChild(this.container);
        }
        const props = Object.assign({}, { style: content ? { maxWidth: 200 } : null }, this.props);
        ReactDOM.unstable_renderSubtreeIntoContainer(this, <Popover {...props} />, this.container);
        this.addStyle();
        this.visible = true;
    }

    hideComponent = () => {
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.container.style.visibility = 'hidden';
            this.visible = false;
        }
    }

    handleClick = () => {
        !this.visible ?
            this.createComponent() :
            this.hideComponent();
    }

    addStyle() {
        this.getPosition();
        for (let style in this.style) {
            this.container.style[style] = this.style[style];
        }
    }

    render() {
        const { children, trigger, hideTrigger } = this.props;
        const child = React.isValidElement(children) ? children : <span>{children}</span>;
        let props: { [x: string]: any } = {};
        if (trigger === 'hover') {
            props.onMouseEnter = this.createComponent;
        } else {
            props.onClick = this.handleClick;
        }

        if (hideTrigger === 'hover') {
            props.onMouseLeave = this.hideComponent;
        } else {
            props.onClick = this.handleClick;
        }

        return React.cloneElement(child, props);
    }
}