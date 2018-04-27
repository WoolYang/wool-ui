import * as React from 'react';
import { Message, Button } from '../../../src/components/index';

export class MessageDemo extends React.Component {

    open() {
        Message.error('错了哦，这是一条错误消息');
    }


    render() {
        return (
            <div style={{ width: '200px', margin: '0 auto' }}>
                <Button plain={true} onClick={this.open.bind(this)}>错误</Button>
            </div>
        )
    }
}