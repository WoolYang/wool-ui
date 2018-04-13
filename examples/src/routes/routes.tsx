import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import componentPage from '../pages/componentPage'
export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={componentPage} />
                <Route path="/component" component={componentPage} />
            </Switch>
        </Router>
    )
}