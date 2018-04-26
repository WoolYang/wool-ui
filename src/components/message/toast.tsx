import React from 'react';
import * as PropTypes from 'prop-types';
import { Transition, View } from '../libs';

export default class Toast extends React.Component<any, any> {

    static propTypes = {
        type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
        duration: PropTypes.number,
        showClose: PropTypes.bool,
        customClass: PropTypes.string,
        iconClass: PropTypes.string,
    }

    static defaultProps = {
        type: 'info',
        duration: 3000,
        showClose: false
    }

    constructor(props: any) {
        super(props);

        this.state = {
            visible: false
        };
    }

}