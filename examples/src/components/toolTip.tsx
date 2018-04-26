import * as React from 'react';
import { Tooltip, Button } from '../../../src/components/index';

export class TooltipDemo extends React.Component {
    render() {
        return (
            <div>
                <Tooltip title="tooltip">
                    <Button>默认按钮</Button>
                </Tooltip>
            </div>
        )
    }
}