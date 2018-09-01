class Dialog {
    constructor(data) {
        this.data = JSON.parse(data);
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
    }

    update() {
        fetch(
            `/api/dialog/${this.data['id']}`,
            { method: 'GET' }
        )
        .then(json)
        .then(data => {
            if (data) {
                const hashCheck = Crypto.sha512hex(JSON.stringify(data))
                    === Crypto.sha512hex(JSON.stringify(this.data));

                if (!hashCheck) {

                }
            }
        })
        .catch(error => {
            throw new Error(`Request failed: ${error}`);
        });
    }

    send() {
        const input = document.querySelector(".msg-box .msg-box__input").value;
        const hasAttachment = false;

        let msg = {
            id: '',
            kind: (hasAttachment) ? (
                (!input) ? 'attachment' : 'text&attachment'
            ) : (
                'text'
            ),
            text: input,
            options: []
        };

        if (msg.kind === 'test' && !msg.text) {
            alert('Нельзя отправить пустое сообщение!');
            return;
        }

        if (msg.kind === 'text') {
            const resStatus = fetch(`/api/msg/${this.data['id']}`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: `kind=${msg['king']}&text=${msg['text']}&options=${msg['options']}`
            })
            .then(json)
            .then(response => {
                return response['status'];
            })
            .catch(error => {
                throw new Error(`Request failed: ${error}`);
            });

            if (resStatus === 0) {
                render(msg);
            }
        }
    }

    render(msg) {
        const dialogDOM = document.querySelector(`#${this.data['id']}`);

        // Составление HTML кода для вставки
        const msgDOM = document.createElement('li');
        msgDOM.className = 'dialog__wrap-msg dialog__wrap-msg_sent';

        msgDOM.innerHTML = `\
            <div class="dialog__msg dialog__msg_incoming"> \
                <span class="dialog__msg-text"> \
                    ${msg['text']} \
                </span> \
            </div> \

            <div class="dialog__msg-meta"> \
                <span>${msg['options'][0]}</span> \
            </div>`;

        let el = document
            .getElementById(`${this.data['id']}`)
            .getElementsByClassName('dialog')
            .item(0)
            .appendChild(msgDOM);
    }
}
