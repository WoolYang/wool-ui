import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class MixinComponent extends React.Component<any, any> {

    static contextTypes = {
        component: PropTypes.object,
    };

    parent() {
        console.log(this.context.component)
        return this.context.component;
    }


    indexPath(): Array<number> {
        let path: Array<number> = [this.props.index];
        let parent: any = this.parent();

        while (parent.instanceType !== 'Menu') {
            if (parent.props.index) {
                path.unshift(parent.props.index);
            }

            parent = parent.parent();
        }

        return path;
    }

    rootMenu() {
        let parent: any = this.parent();

        while (parent.instanceType !== 'Menu') {
            parent = parent.parent();
        }

        return parent;
    }
}