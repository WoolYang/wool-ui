/*
    * 函数防抖
    * @param {Function} 需要防抖的function
    * @param {number} [wait=0] 需要延时的时间
    * @param {immediate} 是否开启立即执行，默认为false
    * @returns  {any} 立即执行时返回function的返回值
*/
export function debounce(func, wait, immediate) {
    //immediate时以timeout为中介决定是否立即执行，立即执行后经过wait时间重置timeout
    let timeout, result;
    return function () {
        const context = this; //修正this指向
        const args = arguments; //参数，event对象

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout; //如果timeout为null或undefined，立即执行
            timeout = setTimeout(function () {
                timeout = null; //延迟后重置timeout
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function () {
                func.apply(context, args) //修正this指向，参数
            }, wait);
        }
        return result;
    }
}

/*
    * 函数节流
    * @param {Function} 需要节流的function
    * @param {number} [wait=0] 需要延时的时间
    * @param {options：leading：false | trailing: false} leading：false 表示禁用第一次执行 trailing: false 表示禁用停止触发的回调
    * @returns  {throttle} 返回节流函数
*/
export function throttle(func, wait, options) {
    let timeout, context, args, result;
    let previous = 0;
    if (!options) options = {};

    let later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    let throttled = function () {
        let now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}