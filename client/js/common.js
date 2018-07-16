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

    /* === END Обработка input на странице авторизации === */
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
/* === END Для работы с классами === */

/* === Переключение между диалогами === */
function switchDialog(evt, dlg) {
    let tabContent = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContent.length; i++)
        tabContent[i].style.display = 'none';

    let tabLinks = document.getElementsByClassName('tab-links');
    for (let i = 0; i < tabLinks.length; i++)
        tabLinks[i].className = tabLinks[i].className.replace(' focus', '');

    document.getElementById(dlg).style.display = 'block';
    evt.currentTarget.className += ' focus';

    document.forms['messageField'].elements['message'].value = '';

    console.log('Переключено на ', evt.currentTarget);
}

/* === END Переключение между диалогами === */

/* === Отрисовка сообщений == */
function sendMessage() {

    //Поиск выбранного диалога
    let tabContent = document.getElementsByClassName('tab-content');
    let num = 0;
    for (let i = 0; i < tabContent.length; i++) {
        if (tabContent[i].style.display === 'block') {
            num = i + 1;
            break;
        }
    }

    //Если пользователь не переключал диалоги, то нужно выбрать тот, который загружается по умолчанию
    if (num === 0)
        num = 1;

    //Составление HTML кода для вставки
    const MSG = document.forms['messageField'].elements['message'].value;
    const newLi = document.createElement('li');
    newLi.className = 'sent';
    newLi.innerHTML = '<div class="msg"><div class="msg-header">'
        + new Date()
        + '</div><div class="msg-content text">'
        + MSG
        + '</div></div><div class="profile"><img src="img/user6.jpg"></div>';

    //Вставка HTML кода
    let test = document
        .getElementById(num.toString())
        .getElementsByClassName('chat-messages')
        .item(0)
        .appendChild(newLi);

    // Опускаем scrollbar вниз
    let chatScroll = document.getElementById(num.toString())
        .querySelector('.chat-messages');

    chatScroll.scrollTop = chatScroll.scrollHeight - chatScroll.clientHeight;

    console.log('Добавлено сообщение ', test);
}

/* === END Отрисовка сообщений == */


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
