import * as React from 'react';
import * as PropTypes from 'prop-types';

export type Placement = 'left' | 'right' | 'top' | 'bottom';
export type Trigger = 'click' | 'hover';

export interface AbstractPopperProps {
    title?: string | React.ReactNode;
    content?: string | React.ReactNode;
    placement?: Placement;
    style?: React.CSSProperties;
    visibleArrow?: boolean;
}

export interface ToolTipProps extends AbstractPopperProps {
    trigger?: Trigger;
    hideTrigger?: Trigger;
    openDelay?: number;
}

export class ToolTip extends React.Component<ToolTipProps, any>{
    static propTypes = {
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
        trigger: 'hover',
        hideTrigger: 'hover',
        placement: "left",
        visibleArrow: true,
        openDelay: 0
    }
}