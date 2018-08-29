'use strict';

((window) => {

  let hasClass, addClass, removeClass;

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  if ('classList' in document.documentElement) {
    hasClass = function(elem, cls) {
      return elem.classList.contains(cls);
    };

    addClass = function(elem, cls) {
      elem.classList.add(cls);
    };

    removeClass = function(elem, cls) {
      elem.classList.remove(cls);
    };
  }

  else {
    hasClass = function(elem, cls) {
      return classReg(cls).test(elem.className);
    };

    addClass = function(elem, cls) {
      if (!hasClass(elem, cls))
        elem.className = elem.className + ' ' + cls;
    };

    removeClass = function(elem, cls) {
      elem.className = elem.className.replace(classReg(cls), ' ');
    };
  }

  function toggleClass(elem, cls) {
    let foo = hasClass(elem, cls) ? removeClass : addClass;
    foo(elem, cls);
  }

  let cssClasses = {
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  if (typeof define === 'function' && define.amd)  define(cssClasses);
  else if (typeof exports === 'object')  module.exports = cssClasses;
  else window.cssClasses = cssClasses;

})(window);
