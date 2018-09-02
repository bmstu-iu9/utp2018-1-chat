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
            cssClasses.add(inputEl.parentNode, 'input_fill');

        inputEl.addEventListener('focus', onInputFocus);
        inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
        cssClasses.add(ev.target.parentNode, 'input_fill');
    }

    function onInputBlur(ev) {
        if (ev.target.value.trim() === '')
            cssClasses.remove(ev.target.parentNode, 'input_fill');
    }
}, false);

function showSidebar() {
    if (!cssClasses.has(document.querySelector('.sidebar'), 'sidebar_showed'))
        cssClasses.add(document.querySelector('.sidebar'), 'sidebar_showed');
    else
        cssClasses.remove(document.querySelector('.sidebar'), 'sidebar_showed');
}

/* === Смена стиля == */
function changeStyle(theme) {
    let src;

    if (theme === 'light') src = '';
    else if (theme === 'dark') src = '/css/dark.min.css';
    else if (theme === 'dark-blue') src = '/css/dark-blue.min.css'

    let p = document.head.getElementsByTagName('link');
    for (let i = 0; i < p.length; i++) {
        if (p[i].href.indexOf('/css/dark.min.css') !== -1
            || p[i].href.indexOf('/css/dark-blue.min.css') !== -1) {
            document.head.removeChild(p[i]);
            break;
        }
    }

    if (src === '') {
        return;
    }

    addCssToDom(src)
}

function addCssToDom(url) {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = url;
    document.head.appendChild(style);
}

/* === END Смена стиля == */

/* === Преключение формы === */
function flip() {
    const flipper = document.getElementById('auth-flip');

    if (cssClasses.has(flipper, 'flip-on')) {
        cssClasses.remove(document.getElementById('auth-flip'), 'flip-on')
    } else {
        cssClasses.add(document.getElementById('auth-flip'), 'flip-on')
    }
}

function json(response) {
    return response.json()
}
