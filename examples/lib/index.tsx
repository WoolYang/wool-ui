import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonDemo } from './components/button';
import { InputDemo } from './components/input';
import { RadioDemo } from './components/radio';
import { CheckboxDemo } from './components/checkbox';

import '../style/style.less'

class Example extends React.Component {
    render() {
        return (
            <div>
                <CheckboxDemo />
            </div>
        )
    }
}

ReactDOM.render(
    <Example />, document.querySelector(".main")
);