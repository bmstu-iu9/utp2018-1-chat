'use strict'

function showEmoji() {
    let elem = document.getElementById('emoji');
    elem.classList.add('emoji-menu_shown');
}

function hideEmoji() {
    let elem = document.getElementById('emoji');
    elem.classList.remove('emoji-menu_shown');
}

function putEmoji(elem) {
    const emoji = elem.innerHTML;
    document.querySelector('.msg-box .msg-box__input').value += emoji;
}

document.addEventListener('DOMContentLoaded', function () {
    if (navigator.appVersion.indexOf('X11') != -1) {
        cssClasses.add(document.querySelector('.emoji-list'), 'emoji-font');
    } else if (navigator.appVersion.indexOf('Linux') != -1) {
        cssClasses.add(document.querySelector('.emoji-list'), 'emoji-font');
    }
});
