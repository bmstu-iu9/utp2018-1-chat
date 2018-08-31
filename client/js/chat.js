'use strict'

function isDefined (variable, dlft) {
    return typeof variable === 'undefined' ? dlft : variable;
}

let Chat = (function () {
    let chat = {};

    let _dialogs = [];

    const _getDialogs = function () {
        // TODO : Получение диалогов из БД
    };

    const _renderDialogs = function () {
        // TODO : Отрисовка диалогов
        // - Список диалогов
        // - Сообщения в диалоге
    };

    chat.createDialog = function (kind, title, description, avatar, members) {
        if (arguments.length !== 5)
            throw new Error('Недопустимое число аргументов');

        let newDialog = fetch(`/api/dialog`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `kind=${kind}&
                   title=${title}&
                   description=${description}&
                   avatar=${avatar}&
                   date=${new Date().toUTCString()}&
                   members=${members}&`
        })
        .then(json)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            throw new Error(`Request failed: ${error}`);
        });

        newDialog.then(data => {
            _dialogs.push(Dialog.create(data));
        });
    };

    return chat;
})();

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

function json(response) {
    return response.json()
}

function sendMessage() {
    const msg = document.querySelector(".msg-box .msg-box__input").value;

    if (msg == '') {
        alert('Нельзя отправить пустое сообщение');
        return;
    }

    let kind = 'txt';
    let dlgID = '543142';

    fetch(`/api/msg/${dlgID}`, {
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `text=${msg}&kind=${kind}&date=${new Date().toUTCString()}`
    })
    .then(json)
    .then(data => {
        console.log('Request succeeded', data);
    })
    .catch(error => {
        console.log('Request failed', error);
    });

    // renderMessage(msg, kind);
}

function renderMessage(text, kind, status) {
    // Поиск выбранного диалога
    let tabContent = document.getElementsByClassName('tab-content');
    let num = 0;
    for (let i = 0; i < tabContent.length; i++) {
        if (tabContent[i].style.display === 'block') {
            num = i + 1;
            break;
        }
    }

    // Если пользователь не переключал диалоги, то нужно выбрать тот,
    // который загружается по умолчанию
    if (num === 0)
        num = 1;

    // Составление HTML кода для вставки
    const newLi = document.createElement('li');
    newLi.className = 'sent';
    newLi.innerHTML = '<div class="msg"><div class="msg-header">'
        + new Date()
        + '</div><div class="msg-content text">'
        + text
        + '</div></div><div class="profile"><img src="img/user6.jpg"></div>';

    // Вставка HTML кода
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



