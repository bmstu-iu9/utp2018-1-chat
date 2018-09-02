'use strict'

function isDefined (variable, dlft) {
    return typeof variable === 'undefined' ? dlft : variable;
}

let Chat = (function () {
    let chat = {};

    let _dialogs = [];
    let _activeDialogID = '';

    let _dialogsInputs = [];

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
                    ${(dlg.get('messages').length > 0) ? (
                        dlg.get('messages')[dlg.get('messages').length - 1].options.split(' ')[4].slice(0, -3)
                    ) : (
                        ''
                    )} \
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
                                dlg.get('messages')[dlg.get('messages').length - 1]['text']
                            ) : (
                                ''
                            )
                        } \
                      </span> \
                    </div> \
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

        Chat.getThisUserByToken().then(author => {

            dlg.get('messages').forEach(msg => {
                let isSent;
                if (msg['author'] !== author['login']) {
                    isSent = false;
                } else {
                    isSent = true;
                }

                const msgChatDOM = document.createElement('li');
                msgChatDOM.className = isSent ? (
                    'dialog__wrap-msg dialog__wrap-msg_sent'
                ) : (
                    'dialog__wrap-msg dialog__wrap-msg_incoming'
                );

                msgChatDOM.id = msg['id'];

                msgChatDOM.innerHTML = `\
                    ${isSent ? (
                        '<div class="dialog__msg dialog__msg_sent">'
                    ) : (
                        '<div class="dialog__msg dialog__msg_incoming">'
                    )} \
                        <span class="dialog__msg-text"> \
                            ${msg['text']} \
                        </span> \
                    </div> \
                    \
                    <div class="dialog__msg-meta"> \
                      <span>${msg.options.split(' ')[4].slice(0, -3)}</span> \
                    </div>`;

                let el = document
                    .getElementById(`${dlg.get('id')}`)
                    .getElementsByClassName('chat__dialogs-list')
                    .item(0)
                    .appendChild(msgChatDOM);

            });
        });
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
            _dialogsInputs.push({
                id: data['id'],
                text: ''
            });

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

    chat.getCookie = function (name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    chat.getThisUserByToken = async function () {
        const token = chat.getCookie('session_token');

        if (!token) {
            throw Error('Отсутствует токен сессии.');
        }

        return await fetch(`/api/session/${token}`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    };

    chat.getDialogsInput = function (id) {
        let res;
        _dialogsInputs.forEach(input => {
            if (input['id'] === id) {
                console.log(input['id'], input['text']);
                res = input['text'];
            }
        });

        return res;
    };

    chat.getDialogsI = function () {

        return _dialogsInputs;
    };

    chat.updateDialogsInputs = function (id, value) {
        console.log(id, value);
        _dialogsInputs.forEach(input => {
            if (input['id'] === id) {
                input.text = value;
            }
        });
    };

    chat.start = async function () {
        await _getDialogs().then(dialogs => {
            dialogs.forEach(data => {
                _dialogs.push(new Dialog(JSON.stringify(data)));
                _dialogsInputs.push({
                    id: data['id'],
                    text: ''
                });
            });
        });

        _renderDialogs();
        _activeDialogID = _dialogs[0];

        cssClasses.add(document.querySelector('.dialogs-list__dlg'), 'dialogs-list__dlg_active');

        let updateDialogs = setInterval(() => {
            _dialogs.forEach(dlg => {
                dlg.update();
            });
        }, 2500);
    };

    return chat;
})();

function switchDialog(evt, dlg) {
    Chat.updateDialogsInputs(
        Chat.getActiveDialogID(),
        document.querySelector('.msg-box .msg-box__input').value
    );

    Chat.setActiveDialogID(dlg);

    console.log(Chat.getDialogsI());
    let tabContent = document.getElementsByClassName('chat-list__item');
    for (let i = 0; i < tabContent.length; i++)
        tabContent[i].style.display = 'none';

    let tabLinks = document.getElementsByClassName('dialogs-list__dlg');
    for (let i = 0; i < tabLinks.length; i++)
        tabLinks[i].className = tabLinks[i].className.replace(' dialogs-list__dlg_active', '');

    document.getElementById(dlg).style.display = 'block';
    evt.currentTarget.className += ' dialogs-list__dlg_active';

    const inputText = Chat.getDialogsInput(Chat.getActiveDialogID());
    document.querySelector('.msg-box .msg-box__input').value = !inputText ? (
        ''
    ) : (
        inputText
    );
}

document.addEventListener('DOMContentLoaded', function () {
    Chat.start();

    document.onkeyup = function(event) {
        if (document.querySelector('.msg-box .msg-box__input') === document.activeElement) {
            if (event.keyCode == 13) {
                Chat.sendMessage();
            }
        }
    }
});

function goSearch() {
    const req = document.getElementById('myDiv').value.toLowerCase();

    if (req === '') {
        alert("пустой поисковый запрос");
    } else {
        const in_msgs = document.getElementsByClassName("dialog__wrap-msg dialog__wrap-msg_incoming");
        const sent_msgs = document.getElementsByClassName("dialog__wrap-msg dialog__wrap-msg_sent");

        let counter = 0;

        Array.from(in_msgs).forEach(function(e) {
            const text = e.children[0].children[0].textContent.toLowerCase();
            if (text.indexOf(req) == -1) {
                e.style.display = 'none';
            } else {
                counter++;
            }
        });

        Array.from(sent_msgs).forEach(function(e) {
            const text = e.children[0].children[0].textContent.toLowerCase();
            if (text.indexOf(req) == -1) {
                e.style.display = 'none';
            } else {
                counter++;
            }
        });

    }
}

function endSearch() {
    const in_msgs = document.getElementsByClassName("dialog__wrap-msg dialog__wrap-msg_incoming");
    const sent_msgs = document.getElementsByClassName("dialog__wrap-msg dialog__wrap-msg_sent");

    Array.from(in_msgs).forEach(e => e.style.display = '');

    Array.from(sent_msgs).forEach(e => e.style.display = '');
}

function func() {
    document.querySelector('#dialog_window').click();
}
