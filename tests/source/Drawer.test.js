import React from 'react';
import {
  mount,
  shallow,
  render
} from 'enzyme';

import {
  Drawer
} from '../../src/index.js';

describe('(组件) Drawer', () => {

  it('调用 componentDidMount', () => {

    //props测试用例
    const props = {
      style: {}, //窗口样式
      visible: false, //是否关闭窗口
      maskStyle: {}, //蒙层样式
      maskAnimation: false, //是否蒙层动画
      animation: 'none', //动画效果slide fade none
      changeVisible: function() {} //关闭事件
    }

    sinon.spy(Drawer.prototype, 'componentDidMount');

    mount(<Drawer {...props} />);

    // Drawer的componentDidMount方法应该被调用一次，使用expect断言
    expect(Drawer.prototype.componentDidMount).to.have.property('callCount', 1);
    Drawer.prototype.componentDidMount.restore();
  });

  it('组件应该被渲染为 <div>', () => {
    const wrapper = shallow(<Drawer/>);
    expect(wrapper.type()).to.eql('div');
  });

  describe('当visible为false,maskAnimation为false时', () => {
    const wrapper = shallow(
      <Drawer visible={false} maskAnimation={false} />
    )
    it('组件className应该被渲染为drawer-wrap drawer-hide', () => {
      expect(wrapper.prop('className')).to.eql('drawer-wrap drawer-hide');
    });
  });

  describe('当visible为true,maskAnimation为true时', () => {
    const wrapper = shallow(
      <Drawer visible={true} maskAnimation={true} />
    )
    it('组件className应该被渲染为drawer-wrap drawer-show drawer-mask-fadeIn', () => {
      expect(wrapper.prop('className')).to.eql('drawer-wrap drawer-show drawer-mask-fadeIn');
    });
  });

  describe('当mask层被点击时', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(
      <Drawer changeVisible={onButtonClick} />
    )
    it('触发changeVisible', () => {
      wrapper.find('.drawer-wrap').simulate('click');

      expect(onButtonClick).to.have.property('callCount', 1);
    });
  });

  describe('当弹出层被点击时', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(
      <Drawer changeVisible={onButtonClick} />
    )
    it('未触发changeVisible', () => {
      wrapper.find('.drawer-content').simulate('click');

      expect(onButtonClick).to.have.property('callCount', 0);
    });
  });

});