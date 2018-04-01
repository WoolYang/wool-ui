import * as React from 'react';
import * as PropTypes from 'prop-types';

export default class MixinComponent extends React.Component<any, any> {
    parent(): React.Component {
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

    rootMenu(): React.Component {
        let parent: any = this.parent();

        while (parent.instanceType !== 'Menu') {
            parent = parent.parent();
        }

        return parent;
    }
}