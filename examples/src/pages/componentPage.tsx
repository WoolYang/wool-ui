import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { childRoutes } from '../routes/childRoutes' //子路由列表

import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import '../../style/public.less'

export default class ComponentPage extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="main container">
                    <Sidebar />
                    <div className='content'>
                        {
                            childRoutes.map((route, index) => (
                                <Route key={index} path={route.path} component={route.component} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}