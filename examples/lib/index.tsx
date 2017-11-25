import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello, Button } from '../../src/components/index';
import '../style/style.less'

class Example extends React.Component {
    render() {
        return (
            <div>
                <Button>默认按钮</Button>
                <Button type="primary" >主要按钮</Button>
                <Button type="success" >成功按钮</Button>
                <Button type="warning" >警告按钮</Button>
                <Button type="danger" >危险按钮</Button>
                <Button type="info" >信息按钮</Button>
                <Hello compiler="TypeScript" framework="React" />
            </div>
        )
    }
}

ReactDOM.render(
    <Example />, document.querySelector(".main")
);