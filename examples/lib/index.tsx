import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ButtonDemo } from './components/button';
import { InputDemo } from './components/input';
import { RadioDemo } from './components/radio';
import { CheckboxDemo } from './components/checkbox';
import { GridDemo } from './components/grid';
import { SelectDemo } from './components/select';
import { TransferDemo } from './components/transfer';
import { DatePickerDemo } from './components/datepicker';
import { SwitchDemo } from './components/switch';
import { MenuDemo } from './components/menu';

import '../style/style.less'

class Example extends React.Component {
    render() {
        return (
            <div>
                <MenuDemo />
            </div>
        )
    }
}

ReactDOM.render(
    <Example />, document.querySelector(".main")
);