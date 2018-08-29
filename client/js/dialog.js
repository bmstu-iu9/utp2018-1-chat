let Dialog = (function () {
    let dialog = {};

    dialog.create = function (data) {
        let newDialog = {
            _dialogData: data,

            get: function (key) {
                return JSON.parse(this._dialogData)[key];
            },

            set: function (key, value) {
                this._dialogData[key] = value;
            },

            update: function () {
                return fetch(
                    `/api/dialog/${JSON.parse(this._dialogData)['id']}`,
                    { method: 'GET' }
                )
                .then(json)
                .then(data => {
                    if (data) {
                        return Crypto.sha512hex(JSON.stringify(data))
                            === Crypto.sha512hex(this._dialogData);
                    }
                })
                .catch(error => {
                    throw new Error(`Request failed: ${error}`);
                });
            }
        };

        return newDialog;
    };

    return dialog;
})();
