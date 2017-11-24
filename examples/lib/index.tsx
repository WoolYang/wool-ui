import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello, Button } from '../../src/components/index';
import '../style/style.less'

class Example extends React.Component {
    render() {
        return (
            <div>
                <Button />
                <Hello compiler="TypeScript" framework="React" />
            </div>
        )
    }
}

ReactDOM.render(
    <Example />, document.querySelector(".main")
);