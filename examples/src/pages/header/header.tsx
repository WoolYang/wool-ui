import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/header.less';

export class Header extends React.Component {
    render() {

        return (
            <div className='header'>
                <div className='container'>
                    <h1>Wool</h1>
                </div>
            </div>
        )
    }
}