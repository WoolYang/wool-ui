import * as React from 'react';
import { Tooltip, Button } from '../../../src/components/index';

export class TooltipDemo extends React.Component {
    render() {
        return (
            <div>
                <Tooltip title="tooltip111111111111111111111">
                    <Button>left</Button>
                </Tooltip>
                <Tooltip title="tooltip2222222222222222222222" placement="top">
                    <Button>top</Button>
                </Tooltip>
                <Tooltip title="tooltip3333333333333333333333" placement="right">
                    <Button>right</Button>
                </Tooltip>
                <Tooltip title="tooltip44444444444444444444444" placement="bottom">
                    <Button>bottom</Button>
                </Tooltip>
            </div>
        )
    }
}