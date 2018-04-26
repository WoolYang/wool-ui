import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AbstractPopperProps } from './toolTip';

export interface PopoverProps extends AbstractPopperProps { }
export default class Popover extends React.Component<PopoverProps, any> {

    static defaultProps = {
        prefixCls: 'wool-poppver'
    }

    render() {
        const { title, style, content, placement, prefixCls } = this.props;
        return (
            <div
                style={style}
                className={`${prefixCls} el-${placement}`}
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