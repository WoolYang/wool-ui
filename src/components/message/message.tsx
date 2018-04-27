import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Toast from './toast';

export type Type = 'success' | 'warning' | 'info' | 'error';

export interface ToastProps {
    type?: Type;
    message: string | React.ReactNode;
    duration?: number;
    showClose?: boolean;
    customClass?: string;
    iconClass?: string;
    onClose?: any;
    prefixCls?: string;
}

export const Message: any = (props: ToastProps, type: Type) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    if (typeof props === 'string' || React.isValidElement(props)) {
        props = {
            message: props
        };
    }

    if (type) {
        props.type = type;
    }

    const component = React.createElement(Toast, Object.assign(props, {
        willUnmount: () => {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);

            if (props.onClose instanceof Function) {
                props.onClose();
            }
        }
    }));

    ReactDOM.render(component, div);
}

['success', 'warning', 'info', 'error'].forEach((type: Type) => {
    Message[type] = (options = {}) => {
        return Message(options, type);
    };
});