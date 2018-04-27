import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AbstractPopperProps } from './toolTip';
import './style/tooltip.less';

export interface PopoverProps extends AbstractPopperProps { }
export default class Popover extends React.Component<PopoverProps, any> {

    render() {
        const { title, style, content, placement, prefixCls } = this.props;
        return (
            <div
                style={style}
                className={`${prefixCls} ${placement}`}
            >
                <div className={`${prefixCls}-inner`}>
                    <div className={`${prefixCls}-title`}>
                        {title}
                    </div>
                    {!!content &&
                        <div className={`${prefixCls}-body`}>
                            {content}
                        </div>}
                </div>
            </div>
        )
    }
}