import * as React from 'react';
import * as PropTypes from 'prop-types';

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
        prefixCls: 'wool-tooltip',
        trigger: 'hover',
        hideTrigger: 'hover',
        placement: "left",
        visibleArrow: true,
        openDelay: 0
    }

    render() {
        const { children, trigger, hideTrigger } = this.props;
        const child = React.isValidElement(children) ? children : <span>{children}</span>;
        let props = {};

        return React.cloneElement(child, props);
    }
}