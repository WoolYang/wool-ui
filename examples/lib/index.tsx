import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from '../../src/components/index';
import '../style/style.less'

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.querySelector(".main")
);