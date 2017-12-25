import * as React from 'react';
import * as PropTypes from 'prop-types';

import { TransferProps } from './transfer';
import { CheckboxGroup } from '../checkbox/index';
import { Input } from '../input/index';
import './style/transfer.less';

export interface TransferPanelProps extends TransferProps {
    title?: string | number
    checkedList?: any,
    changeChecked?: any
}

export class TransferPanel extends React.Component<TransferPanelProps, any> {
    static propTypes = {
        checkedList: PropTypes.array,
        changeChecked: PropTypes.func
    };

    static defaultProps = {
        title: '',
        prefixCls: 'wool-transfer',
    };

    constructor(props: TransferPanelProps) {
        super(props);

        this.state = {
            query: ''
        }
    }

    handleChange = (value: any) => {
        this.props.changeChecked(value)
    }

    handleInputChange = (e: any) => {
        this.setState({ query: e.target.value });
    };

    get filterData() {
        const { data, propsAlias, filterMethod } = this.props;
        let filterData = data.filter((item: any) => {
            if (typeof filterMethod === 'function') {
                return filterMethod(this.state.query, item);
            } else {
                const label = item[propsAlias.label] || item[propsAlias.value].toString();
                return label.toLowerCase().includes(this.state.query.toLowerCase());
            }
        });

        return filterData.map((item: any) => {
            return { label: item[propsAlias.label], value: item[propsAlias.value] }
        })
    }

    render() {
        const { data, title, checkedList, filterable, filterPlaceholder, prefixCls } = this.props;
        return (
            <div className={`${prefixCls}-panel`}>
                <p className={`${prefixCls}-header`}>
                    <span>{title}</span>
                    <span>{checkedList.length}/{data.length}</span>
                </p>
                {filterable &&
                    <Input
                        size="small"
                        placeholder={filterPlaceholder}
                        onChange={this.handleInputChange}
                    />}
                <div>
                    {data.length === 0
                        ? <span className={`${prefixCls}-no-data`}>无数据</span>
                        : this.filterData.length === 0
                            ? <span className={`${prefixCls}-no-data`}>无匹配数据</span>
                            : null
                    }
                    <CheckboxGroup
                        className={`${prefixCls}-check-group`}
                        options={this.filterData}
                        value={checkedList}
                        onChange={this.handleChange}
                        showAll={true}
                        showAllName=""
                    />
                </div>
            </div>
        )
    }
}