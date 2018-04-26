import * as React from 'react';
import { Tooltip, Button } from '../../../src/components/index';

export class TooltipDemo extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Tooltip title="tooltip111111111111111111111">
                        <Button>left</Button>
                    </Tooltip>
                    <Tooltip title="tooltip111111111111111111111" placement="left-start">
                        <Button>left-start</Button>
                    </Tooltip>
                    <Tooltip title="tooltip2222222222222222222222" placement="left-end">
                        <Button>left-end</Button>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="tooltip3333333333333333333333" placement="right">
                        <Button>right</Button>
                    </Tooltip>
                    <Tooltip title="tooltip3333333333333333333333" placement="right-start">
                        <Button>right-start</Button>
                    </Tooltip>
                    <Tooltip title="tooltip44444444444444444444444" placement="right-end">
                        <Button>right-end</Button>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="tooltip2222222222222222222222" placement="top">
                        <Button>top</Button>
                    </Tooltip>
                    <Tooltip title="tooltip111111111111111111111" placement="top-start">
                        <Button>top-start</Button>
                    </Tooltip>
                    <Tooltip title="tooltip2222222222222222222222" placement="top-end">
                        <Button>top-end</Button>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="tooltip44444444444444444444444" placement="bottom">
                        <Button>bottom</Button>
                    </Tooltip>
                    <Tooltip title="tooltip3333333333333333333333" placement="bottom-start">
                        <Button>bottom-start</Button>
                    </Tooltip>
                    <Tooltip title="tooltip44444444444444444444444" placement="bottom-end">
                        <Button>bottom-end</Button>
                    </Tooltip>
                </div>
            </div>
        )
    }
}