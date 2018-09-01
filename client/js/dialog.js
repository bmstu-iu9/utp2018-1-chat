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
        return fetch(
            `/api/dialog/${this.data['id']}`,
            { method: 'GET' }
        )
        .then(json)
        .then(data => {
            if (data) {
                return Crypto.sha512hex(JSON.stringify(data))
                    === Crypto.sha512hex(JSON.stringify(this.data));
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
            const resStatus = fetch(
                `/api/msg/${this.data['id']}`,
                { method: 'POST' }
            )
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

    }
}
