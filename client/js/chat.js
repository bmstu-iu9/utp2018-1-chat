'use strict'

function isDefined (variable, dlft) {
    return typeof variable === 'undefined' ? dlft : variable;
}

let Chat = (function () {
    let chat = {};

    let _dialogs = [];
    let _activeDialogID = '';

    const _getDialogs = function () {
        return fetch(`/api/dialog/*`, {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw new Error(`Request failed: ${error}`);
        });
    };

    const _renderDialog = function (dlg) {
        const dlgItemDOM = document.createElement('li');
        dlgItemDOM.className = 'dialogs-list__dlg';

        dlgItemDOM.onclick = function () {
            switchDialog(event, dlg.get('id'));
        };

        dlgItemDOM.innerHTML = `\
            <a class="dlg-item"> \
                <div class="dlg-item__meta"> \
                    21:50 \
                </div> \
                \
                <div class="dlg-item__photo"> \
                    <img src="img/user.jpg" alt="" class="dlg-item__photo-img">  \
                </div> \
                \
                <div class="dlg-item__msg-wrap"> \
                    <div class="dlg-item__peer"> \
                      <span class="dlg-item__title"> \
                        ${dlg.get('title')} \
                      </span> \
                    </div> \
                    \
                    <div class="dlg-item__msg"> \
                      <span class="dlg-item__short-text"> \
                        ${
                            (dlg.get('messages')[dlg.get('messages').length - 1]) ? (
                                dlg.get('messages')[dlg.get('messages').length - 1]
                            ) : (
                                ''
                            )
                        } \
                      </span> \
                    </div> \
                </div> \
                \
                <div class="dlg-item__label"> \
                    5 \
                </div> \
            </a>`;

        document
            .getElementsByClassName('dialogs-list')
            .item(0)
            .appendChild(dlgItemDOM);

        const dlgChatDOM = document.createElement('li');
        dlgChatDOM.className = 'chat-list__item';
        dlgChatDOM.id = dlg.get('id');

        dlgChatDOM.innerHTML = `<ul class="chat__dialogs-list"></ul>`;

        let el = document
            .getElementsByClassName('chat-list')
            .item(0)
            .appendChild(dlgChatDOM);
    }

    const _renderDialogs = function () {
        console.log(_dialogs);
        _dialogs.forEach(dlg => _renderDialog(dlg));
    };

    chat.createDialog = function (kind, title, description, avatar, members) {
        if (arguments.length !== 5)
            throw new Error('Недопустимое число аргументов');

        let newDialog = fetch(`/api/dialog`, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `kind=${kind}&title=${title}&description=${description}&avatar=${avatar}&date=${new Date().toUTCString()}&members=${members}&`
        })
        .then(json)
        .then(data => {
            return data;
        })
        .catch(error => {
            throw new Error(`Request failed: ${error}`);
        });

        newDialog.then(data => {
            const nDlg = new Dialog(data);
            _dialogs.push(nDlg);
            _renderDialog(nDlg);
        });
    };

    chat.setActiveDialogID = function (dlg) {
        _activeDialogID = dlg;
    }

    chat.getActiveDialogID = function (dlg) {
        return _activeDialogID;
    }

    chat.sendMessage = function () {
        let dialog;

        _dialogs.forEach(dlg => {
            if (dlg.get('id') === _activeDialogID) {
                dialog = dlg;
            }
        });

        dialog.send();
    }

    chat.start = async function () {
        await _getDialogs().then(dialogs => {
            dialogs.forEach(data => {
                _dialogs.push(new Dialog(JSON.stringify(data)));
            });
        });

        _renderDialogs();
        _activeDialogID = _dialogs[0];

    };

    return chat;
})();

function switchDialog(evt, dlg) {
    let tabContent = document.getElementsByClassName('chat-list__item');
    for (let i = 0; i < tabContent.length; i++)
        tabContent[i].style.display = 'none';

    let tabLinks = document.getElementsByClassName('dialogs-list__dlg');
    for (let i = 0; i < tabLinks.length; i++)
        tabLinks[i].className = tabLinks[i].className.replace(' focus', '');

    document.getElementById(dlg).style.display = 'block';
    evt.currentTarget.className += ' focus';

    Chat.setActiveDialogID(dlg);

    // document.forms['messageField'].elements['message'].value = '';
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
}

document.addEventListener('DOMContentLoaded', function () {
    document.onkeyup = function(event) {
        if (document.querySelector('.msg-box .msg-box__input') === document.activeElement) {
            if (event.keyCode == 13) {
                Chat.sendMessage();
            }
        }
    }
});
