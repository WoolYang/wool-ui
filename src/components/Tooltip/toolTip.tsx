import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import Popover from './popover';
import './style/tooltip.less';

export type Placement = 'left' | 'right' | 'top' | 'bottom' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
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
        placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'left-start', 'left-end', 'right-start', 'right-end', 'top-start', 'top-end', 'bottom-start', 'bottom-end']),
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
        let { right, left, top, bottom, width, height } = domNode.getBoundingClientRect(); //dom元素相对于浏览器视口上下左右距离
        let { clientHeight, clientWidth } = this.container; //dom元素高度和宽度
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //视口距离顶部距离
        let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft; //视口距离左边距离
        //计算加上布局尺寸得到绝对尺寸
        top += scrollTop;
        left += scrollLeft;
        right += scrollLeft;
        bottom += scrollTop;

        this.style = { visibility: "visible" };
        switch (placement) {
            case 'left':
                this.style.left = left - clientWidth + 'px';
                this.style.top = top + (height - clientHeight) / 2 + 'px'; //获取两个dom元素之间的留白尺寸折半实现居中
                break;
            case 'right':
                this.style.left = right + 'px';
                this.style.top = top + (height - clientHeight) / 2 + 'px';
                break;
            case 'top':
                this.style.top = top - clientHeight + 'px';
                this.style.left = left + (width - clientWidth) / 2 + 'px';
                break;
            case 'bottom':
                this.style.top = bottom + 'px';
                this.style.left = left + (width - clientWidth) / 2 + 'px';
                break;
            case 'left-start':
                this.style.left = left - clientWidth + 'px';
                this.style.top = top + 'px'; //获取两个dom元素之间的留白尺寸折半实现居中
                break;
            case 'left-end':
                this.style.left = left - clientWidth + 'px';
                this.style.top = top + (height - clientHeight) + 'px'; //获取两个dom元素之间的留白尺寸折半实现居中
                break;
            case 'right-start':
                this.style.left = right + 'px';
                this.style.top = top + 'px';
                break;
            case 'right-end':
                this.style.left = right + 'px';
                this.style.top = top + (height - clientHeight) + 'px';
                break;
            case 'top-start':
                this.style.top = top - clientHeight + 'px';
                this.style.left = left + 'px';
                break;
            case 'top-end':
                this.style.top = top - clientHeight + 'px';
                this.style.left = left + (width - clientWidth) + 'px';
                break;
            case 'bottom-start':
                this.style.top = bottom + 'px';
                this.style.left = left + 'px';
                break;
            case 'bottom-end':
                this.style.top = bottom + 'px';
                this.style.left = left + (width - clientWidth) + 'px';
                break;
        }


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