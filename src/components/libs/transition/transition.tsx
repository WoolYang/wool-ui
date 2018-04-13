import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';

export interface TransitionProps {
    name?: string;
    onEnter?: Function; //进入前触发
    onAfterEnter?: Function; //进去后触发
    onLeave?: Function; //离开前触发
    onAfterLeave?: Function; //离开后触发
    children?: React.ReactElement<any>;
}

export class Transition extends React.Component<TransitionProps, any> {

    [x: string]: any;  //标签索引，否则el会未定义

    constructor(props: TransitionProps) {
        super(props);

        this.state = {
            children: props.children && this.enhanceChildren(props.children) //强化children，添加ref
        }

        this.didEnter = this.didEnter.bind(this); //进入
        this.didLeave = this.didLeave.bind(this); //离开
    }

    componentDidMount() {
        this.toggleHidden()
    }

    componentWillReceiveProps(nextProps: TransitionProps) {
        const children: React.ReactElement<any> = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
        const nextChildren: React.ReactElement<any> = React.isValidElement(nextProps.children) && React.Children.only(nextProps.children);

        if (!nextProps.name) {
            this.setState({ children: nextChildren });
            return;
        }

        this.setState({
            children: this.enhanceChildren(nextChildren)
        })

        /*         if (this.isViewComponent(nextChildren)) {  此处保持view原show属性用意何在？
                    this.setState({
                        children: this.enhanceChildren(nextChildren, { show: children ? children.props.show : true })
                    })
                } else {
                    if (nextChildren) {
                        this.setState({
                            children: this.enhanceChildren(nextChildren)
                        })
                    }
                } */
    }

    componentDidUpdate(preProps: TransitionProps) {
        if (!this.props.name) return;

        const children: React.ReactElement<any> = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
        const preChildren: React.ReactElement<any> = React.isValidElement(preProps.children) && React.Children.only(preProps.children);
        if (this.isViewComponent(children)) {
            if ((!preChildren || !preChildren.props.show) && children.props.show) {
                this.toggleVisible();
            } else if (preChildren && preChildren.props.show && !children.props.show) {
                this.toggleHidden();
            }
        } else {
            if (!preChildren && children) {
                this.toggleVisible();
            } else if (preChildren && !children) {
                this.toggleHidden();
            }
        }
    }

    //过度动画
    get transitionClass() {
        const { name } = this.props;

        return {
            enter: `${name}-enter`,
            enterActive: `${name}-enter-active`,
            enterTo: `${name}-enter-to`,
            leave: `${name}-leave`,
            leaveActive: `${name}-leave-active`,
            leaveTo: `${name}-leave-to`,
        }
    }

    //强化children
    enhanceChildren(children: React.ReactElement<any>, props?: TransitionProps | object) {
        return React.cloneElement(children, Object.assign({ ref: (el: any) => { this.el = el } }, props))
    }

    //进入触发
    didEnter(e: any) {
        const childDOM: any = ReactDOM.findDOMNode(this.el); //获取children DOM
        if (!e || e.target !== childDOM) return;
        const { onAfterEnter } = this.props;
        const { enterActive, enterTo } = this.transitionClass;

        childDOM.classList.remove(enterActive, enterTo);

        childDOM.removeEventListener('transitionend', this.didEnter);
        childDOM.removeEventListener('animationend', this.didEnter);

        onAfterEnter && onAfterEnter();  //触发enter事件
    }

    //离开触发
    didLeave(e: any) {
        const childDOM: any = ReactDOM.findDOMNode(this.el);
        if (!e || e.target !== childDOM) return;

        const { onAfterLeave, children } = this.props;
        const { leaveActive, leaveTo } = this.transitionClass;

        new Promise((resolve) => {
            if (this.isViewComponent(children)) {
                childDOM.removeEventListener('transitionend', this.didLeave);
                childDOM.removeEventListener('animationend', this.didLeave);

                requestAnimationFrame(() => {
                    childDOM.style.display = 'none';
                    childDOM.classList.remove(leaveActive, leaveTo);

                    requestAnimationFrame(resolve);
                })
            } else {
                this.setState({ children: null }, resolve);
            }
        }).then(() => {
            onAfterLeave && onAfterLeave()
        })
    }

    //是否为嵌套view组件
    isViewComponent(element: any) {
        return element && element.type.name === 'View';
    }

    toggleVisible() {
        const { onEnter } = this.props;
        const { enter, enterActive, enterTo, leaveActive, leaveTo } = this.transitionClass;
        const childDOM: any = ReactDOM.findDOMNode(this.el);
        childDOM.addEventListener('transitionend', this.didEnter);
        childDOM.addEventListener('animationend', this.didEnter);

        requestAnimationFrame(() => {
            if (childDOM.classList.contains(leaveActive)) {
                childDOM.classList.remove(leaveActive, leaveTo);

                childDOM.removeEventListener('transitionend', this.didLeave);
                childDOM.removeEventListener('animationend', this.didLeave);
            }

            childDOM.style.display = '';
            childDOM.classList.add(enter, enterActive);

            onEnter && onEnter();

            requestAnimationFrame(() => {
                childDOM.classList.remove(enter);
                childDOM.classList.add(enterTo);
            })
        })
    }

    toggleHidden() {
        const { onLeave } = this.props;
        const { leave, leaveActive, leaveTo, enterActive, enterTo } = this.transitionClass;
        const childDOM: any = ReactDOM.findDOMNode(this.el);

        childDOM.addEventListener('transitionend', this.didLeave);
        childDOM.addEventListener('animationend', this.didLeave);

        requestAnimationFrame(() => {
            if (childDOM.classList.contains(enterActive)) {
                childDOM.classList.remove(enterActive, enterTo);

                childDOM.removeEventListener('transitionend', this.didEnter);
                childDOM.removeEventListener('animationend', this.didEnter);
            }

            childDOM.classList.add(leave, leaveActive);

            onLeave && onLeave();

            requestAnimationFrame(() => {
                childDOM.classList.remove(leave);
                childDOM.classList.add(leaveTo);
            })
        })
    }

    render() {
        return this.state.children;
    }
}