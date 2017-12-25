import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Button } from '../button';
import { TransferPanel } from './transferPanel';
import './style/transfer.less';

export interface TransferAlias {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface TransferProps {
    data?: TransferAlias[]; //array[{ value, label, disabled }]
    filterable?: boolean;
    filterPlaceholder?: string;
    filterMethod?: any;
    titles?: Array<string | number>;
    onChange?: any;
    propsAlias?: TransferAlias;
    value?: any;
    prefixCls?: string;
}

export class Transfer extends React.Component<TransferProps, any> {
    static propTypes = {
        data: PropTypes.array, //array[{ value, label, disabled }]
        filterable: PropTypes.bool,
        filterPlaceholder: PropTypes.string,
        filterMethod: PropTypes.func,
        titles: PropTypes.array,
        onChange: PropTypes.func,
        propsAlias: PropTypes.object,
        value: PropTypes.array
    };

    static defaultProps = {
        filterable: false,
        filterPlaceholder: '请输入搜索内容',
        titles: ['', ''],
        propsAlias: {
            label: 'label',
            value: 'value',
            disabled: false
        },
        prefixCls: 'wool-transfer',
    };

    constructor(props: TransferProps) {
        super(props);

        this.state = {
            leftChecked: [],
            rightChecked: []
        }
    }

    handleChange(isLeft: boolean, value: any) {
        isLeft ? this.setState({ leftChecked: value }) : this.setState({ rightChecked: value });
    }

    get sourceData() {
        const { data = [], value, propsAlias } = this.props;
        return data.filter((item: any) => !value.includes(item[propsAlias.value])) as TransferAlias[];
    }

    get targetData() {
        const { data = [], value, propsAlias } = this.props;
        return data.filter((item: any) => value.includes(item[propsAlias.value])) as TransferAlias[];
    }

    addToLeft = () => {
        const { value } = this.props;
        const { rightChecked } = this.state;
        let currentValue = value.slice();
        rightChecked.forEach((item: string | number) => {
            const index = currentValue.includes(item);
            if (index > -1) {
                currentValue.splice(index, 1);
            }
        });
        this.setState({ leftChecked: [], rightChecked: [] }, () =>
            this.props.onChange(currentValue))
    };


    addToRight = () => {
        const { value } = this.props;
        const { leftChecked } = this.state;
        let currentValue = value.slice();
        leftChecked.forEach((item: string | number) => {
            if (!value.includes(item)) {
                currentValue = currentValue.concat(item);
            }
        });
        this.setState({ rightChecked: [], leftChecked: [] }, () =>
            this.props.onChange(currentValue))
    };

    render() {
        const { data, titles, prefixCls, ...others } = this.props;
        const { leftChecked, rightChecked } = this.state;

        let isTopBtnDisabled = leftChecked.length === 0;
        let isBottomBtnDisabled = rightChecked.length === 0;
        return (
            <div className={prefixCls}>
                <TransferPanel
                    data={this.sourceData}
                    checkedList={leftChecked}
                    title={titles[0]}
                    changeChecked={this.handleChange.bind(this, true)}
                    {...others}
                />
                <div className={`${prefixCls}-buttons`}>
                    <Button
                        type="primary"
                        className={`${prefixCls}-button`}
                        disabled={isTopBtnDisabled}
                        onClick={this.addToRight}
                    >
                    </Button>
                    <Button
                        type="primary"
                        className={`${prefixCls}-button`}
                        disabled={isBottomBtnDisabled}
                        onClick={this.addToLeft}
                    >
                    </Button>
                </div>
                <TransferPanel
                    data={this.targetData}
                    checkedList={rightChecked}
                    title={titles[1]}
                    changeChecked={this.handleChange.bind(this, false)}
                    {...others}
                />
            </div>
        )
    }
}