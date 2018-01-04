import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';
import './style/grid.less';

export interface AbstractRowProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
}
export interface RowProps extends AbstractRowProps {
    gutter?: number;
}

export class Row extends React.Component<RowProps, any> {

    static defaultProps = {
        gutter: 0,
        prefixCls: 'wool-row'
    }

    static propTypes = {
        gutter: PropTypes.number,
        className: PropTypes.string,
        style: PropTypes.object,
    };

    render() {
        const { prefixCls, style, className, gutter, children } = this.props;

        const rowStyle = (gutter as number) > 0 ? {
            marginLeft: `${gutter as number / -2}px`,
            marginRight: `${gutter as number / -2}px`,
            ...style,
        } : style;

        const cols = React.Children.map(children, (col: React.ReactElement<HTMLDivElement>) => {
            if (!col) {
                return null;
            }
            if (col.props && (gutter as number) > 0) {
                return React.cloneElement(col, {
                    style: {
                        paddingLeft: `${gutter as number / 2}px`,
                        paddingRight: `${gutter as number / 2}px`,
                        ...col.props.style,
                    },
                });
            }
            return col;
        });

        const classes = classNames(`${prefixCls}`, className);

        return <div className={classes} style={rowStyle}>{cols}</div>;;
    }
}