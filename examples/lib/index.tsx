import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello, Button } from '../../src/components/index';
import '../style/style.less'

class Example extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Button>默认按钮</Button>
                    <Button type="primary" >主要按钮</Button>
                    <Button type="success" >成功按钮</Button>
                    <Button type="warning" >警告按钮</Button>
                    <Button type="danger" >危险按钮</Button>
                    <Button type="info" >信息按钮</Button>
                    <Button plain={true} >朴素按钮</Button>
                </div>
                <div>
                    <Button type="primary" plain={true} >主要按钮</Button>
                    <Button type="success" plain={true} >成功按钮</Button>
                    <Button type="warning" plain={true} >警告按钮</Button>
                    <Button type="danger" plain={true} >危险按钮</Button>
                    <Button type="info" plain={true} >信息按钮</Button>
                </div>
                <div>
                    <Button type="primary" round={true} >主要按钮</Button>
                    <Button type="success" round={true} >成功按钮</Button>
                    <Button type="warning" round={true} >警告按钮</Button>
                    <Button type="danger" round={true} >危险按钮</Button>
                    <Button type="info" round={true} >信息按钮</Button>
                </div>
                <div>
                    <Button type="text">文字按钮</Button>
                </div>
                <div>
                    <Button>标准按钮</Button>
                    <Button size="medium" >中等按钮</Button>
                    <Button size="small" >小型按钮</Button>
                    <Button size="mini" >超小按钮</Button>
                </div>
                <Hello compiler="TypeScript" framework="React" />
            </div>
        )
    }
}

ReactDOM.render(
    <Example />, document.querySelector(".main")
);