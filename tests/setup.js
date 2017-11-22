import 'raf/polyfill'; //requestAnimationFrame polyfill
import {
	expect
} from 'chai';
import sinon from 'sinon';
import {
	configure
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {
	JSDOM
} from 'jsdom';

configure({ //enzyme react16转换
	adapter: new Adapter()
});

const jsdom = new JSDOM(`<!doctype html><html><body></body></html>`);

const {
	window
} = jsdom;

function copyProps(src, target) {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === 'undefined')
		.reduce((result, prop) => ({
			...result,
			[prop]: Object.getOwnPropertyDescriptor(src, prop),
		}), {});
	Object.defineProperties(target, props);
}
global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: 'node.js',
};
copyProps(window, global);

//设置全局
global.expect = expect;
global.sinon = sinon;