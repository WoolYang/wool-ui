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

import { Header } from './pages/header/header';
import { Sidebar } from './pages/sidebar/sidebar';
import '../style/public.less'

class Index extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="main container">
                    <Sidebar />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Index />, document.querySelector(".app")
);