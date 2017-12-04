import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonDemo } from './components/button';
import { InputDemo } from './components/input';
import '../style/style.less'

class Example extends React.Component {
    render() {
        return (
            <div>
                <InputDemo />
            </div>
        )
    }
}

ReactDOM.render(
    <Example />, document.querySelector(".main")
);