/**
 * 防抖函数：多次触发事件，事件处理函数只执行一次，并且在触发操作后执行。
 * 原理：利用闭包原理，就是函数需要在刚完成时需要被使用，赋值给一个变量，由这个变量去使用。
 * @param {*} callback 回调函数
 * @param {*} wait 延迟时间，默认500ms
 * @param {*} immediate 是否立即执行
 */

export const debounce = (callback, wait = 500, immediate = true) => {
  let timeout = null;
  let debounced = function() {
    let self = this;
    timeout && clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      if (callNow) callback.apply(self, arguments);

      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    } else {
      timeout = setTimeout(() => {
        callback.apply(self, arguments);
      }, wait);
    }
  };
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
};

/**
 * 节流函数：触发操作后，在间隔连续时间内只执行一次，过了规定间隔时间后，才进行下一次调用
 * 原理：对函数进行间隔操作，在规定间隔时间内，如有重复操作，则清除掉本次操作
 * @param {*} callback
 * @param {*} wait 间隔时间，默认500ms
 * @param {*} options = { leading: false, // 禁用第一次执行 trailing: false // 禁用停止触发的回调 }
 * @returns
 */
export const throttle = (callback, wait = 500, options = {}) => {
  let time, context, args;
  let previous = 0;
  let later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    time = null;
    callback.apply(context, args);
    if (!time) context = args = null;
  };
  let throttled = function() {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (time) {
        clearTimeout(time);
        time = null;
      }
      previous = now;
      callback.apply(context, args);
      if (!time) context = args = null;
    } else if (!time && options.trailing !== false) {
      time = setTimeout(later, remaining);
    }
  };
  throttled.cancel = function() {
    clearTimeout(time);
    time = null;
    previous = 0;
  };
  return throttled;
};
