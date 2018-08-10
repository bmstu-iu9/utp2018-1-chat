'use strict'

// Выполнение по загрузки HTML и построении DOM
document.addEventListener('DOMContentLoaded', function () {

    /* === Обработка input на странице авторизации === */
    if (!String.prototype.trim) {
        (() => {
            let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }

    [].slice.call(document.querySelectorAll('input.input-field')).forEach(function (inputEl) {
        if (inputEl.value.trim() !== '')
            clsHelper.add(inputEl.parentNode, 'input_fill');

        inputEl.addEventListener('focus', onInputFocus);
        inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
        clsHelper.add(ev.target.parentNode, 'input_fill');
    }

    function onInputBlur(ev) {
        if (ev.target.value.trim() === '')
            clsHelper.remove(ev.target.parentNode, 'input_fill');
    }
}, false);

/* === Для работы с классами === */
((window) => {
    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    let addClass;
    let removeClass;
    let hasClass;

    if ('classList' in document.documentElement) {
        hasClass = function (el, cls) {
            return el.classList.contains(cls);
        };

        addClass = function (el, cls) {
            el.classList.add(cls);
        };

        removeClass = function (el, cls) {
            el.classList.remove(cls);
        };
    } else {
        hasClass = function (el, cls) {
            return classReg(cls).test(el.className);
        };

        addClass = function (el, cls) {
            if (!hasClass(el, cls)) {
                el.className = el.className + ' ' + cls;
            }
        };

        removeClass = function (el, cls) {
            el.className = el.className.replace(classReg(cls), ' ');
        };
    }

    function toggleClass(el, cls) {
        let func;

        if (hasClass(el, cls))
            func = removeClass;
        else
            func = addClass;

        func(el, cls);
    }

    let clsHelper = {
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    if (typeof define === 'function' && define.amd) {
        define(clsHelper);
    } else {
        window.clsHelper = clsHelper;
    }

})(window);

/* === Смена стиля == */
function changeStyle() {
    let p = document.head.getElementsByTagName('link');
    for (let i = 0; i < p.length; i++) {
        if (p[i].href.indexOf('/css/darkStyle.css') !== -1) {
            document.head.removeChild(p[i]);
            return;
        }
    }
    addCssToDom("../css/darkStyle.css")
}

function addCssToDom(url) {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = url;
    document.head.appendChild(style);
}

/* === END Смена стиля == */

/* === Авторизация === */
function auth(event) {
    if (event.currentTarget.id === 'sign-up') {
        document.getElementById('signup-submit').click();
    } else if (event.currentTarget.id === 'sign-in') {
        document.getElementById('signin-submit').click();
    }
}

/* === Преключение формы === */
function flip() {
    const flipper = document.getElementById('auth-flip');

    if (clsHelper.has(flipper, 'flip-on')) {
        clsHelper.remove(document.getElementById('auth-flip'), 'flip-on')
    } else {
        clsHelper.add(document.getElementById('auth-flip'), 'flip-on')
    }
}
