import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Transfer } from '../../../src/components/index';

export class TransferDemo extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            dataAlias: [],
            titles: ["列表1", "列表2"],
            basicValue: [],
            searchValue: [],
            aliasValue: []
        }
    }

    componentDidMount() {
        let data = [], dataAlias = [];
        for (let i = 0; i <= 5; i++) {
            data.push({
                value: i + 1,
                label: `选项${i + 1}`
            })
            dataAlias.push({
                key: i + 1,
                name: `选项${i + 1}`
            })
        }
        this.setState({ data: data, dataAlias: dataAlias })
    }

    handleChangeBasic(value: any) {
        this.setState({ basicValue: value })
    }

    handleChangeSearch(value: any) {
        this.setState({ searchValue: value })
    }

    handleChangeAlias(value: any) {
        this.setState({ aliasValue: value })
    }

    render() {
        const { data, dataAlias, titles, basicValue, searchValue, aliasValue } = this.state;

        return (
            <div>
                <Transfer
                    data={data}
                    titles={titles}
                    value={basicValue}
                    onChange={this.handleChangeBasic.bind(this)}
                />
                <Transfer
                    data={data}
                    titles={titles}
                    value={searchValue}
                    filterable={true}
                    onChange={this.handleChangeSearch.bind(this)}
                />
            </div>
        )
    }
}