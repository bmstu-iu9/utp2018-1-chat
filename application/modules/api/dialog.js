'use strict'

const source = require('router/source');
const qs = require('querystring');

const log = require('log');

const session = require('auth/session');

const Database = require('db');
const status = require('db/status');

const parser = require('utils/parser');
const generator = require('utils/generator');

const receiver = async (methods, request, response) => {
    if (request.method === 'GET') {
        if (!methods[1]) {
            log.error(`Не правильное обращение к методу (${request.url})`);
            source.send404(response);
        }

        if (methods[1] === '*') {
            const db = await Database.get();

            let allDlgs = await db.dialogs.getDialogs();
            let userDlgs = [];

            session.checkSession(parser.parseCookie(request).session_token, response)
            .then(data => {
                if (data.flag === true) {
                    allDlgs.forEach(dlg => {
                        if (dlg.get('members').indexOf(data.login) != -1) {
                            userDlgs.push(dlg);
                        }
                    });
                }

                source.sendJSON(userDlgs, response);
            });
        } else {
            source.sendJSON(await getDialog(methods[1]), response);
        }
    } else if (request.method === 'POST') {
        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        request.on('end', async () => {
            data = qs.parse(data);

            const db = await Database.get();

            const id = generator.genDialogID();

            const newDialog = await db.dialogs.addDialog(
                id,
                data.kind,
                data.title,
                data.description,
                data.avatar,
                data.members.split(' '),
                new Date(new Date().getTime() + 3* 3600 * 1000)
            );

            source.sendJSON(JSON.stringify(newDialog), response);
        });

    } else if (request.method === 'PUT') {

        if (!methods[1]) {
            log.error(`Не правильное обращение к методу (${request.url})`);
            source.send404(response);
        }

        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        request.on('end', async () => {

        });
    } else if (request.method === 'DELETE') {

        if (!methods[1]) {
            log.error(`Не правильное обращение к методу (${request.url})`);
            source.send404(response);
        }

        const db = await Database.get();

        let dlg = await db.dialogs.findOne(methods[1]);

        await dlg.remove()

        await db.destroy();

    } else {
        source.send404(response);
    }
}

const getDialog = async (id) => {
    const db = await Database.get();

    return db.dialogs.findOne(id)
        .exec()
        .then(async (doc) => {
            return doc;
        });
};

module.exports.receiver = receiver;
