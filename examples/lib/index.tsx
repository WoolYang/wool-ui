import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonDemo } from './components/button';
import { InputDemo } from './components/input';
import { RadioDemo } from './components/radio';
import '../style/style.less'

class Example extends React.Component {
    render() {
        return (
            <div>
                <RadioDemo />
            </div>
        )
    }
}

ReactDOM.render(
    <Example />, document.querySelector(".main")
);