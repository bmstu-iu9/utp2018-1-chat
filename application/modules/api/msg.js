'use strict'

const source = require('router/source');
const parser = require('utils/parser')
const qs = require('querystring');

const log = require('log');

const Database = require('db');
const status = require('db/status');

const receiver = async (methods, request, response) => {
    if (request.method === 'GET') {
        if (!methods[1]) {
            log.error(`Не правильное обращение к методу (${request.url})`);
            source.send404(response);
        }

        let msg = await getMsg(methods[1]);

        if (msg) {
            source.sendJSON(msg, response);
        }

    } else if (request.method === 'POST') {
        if (!methods[1]) {
            log.error(`Не правильное обращение к методу (${request.url})`);
            source.send404(response);
        }

        const dlgID = methods[1];

        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        request.on('end', () => {
            const dbResponse = addMsg(dlgID, qs.parse(data));
            source.sendJSON(JSON.stringify({ status: dbResponse }), response);
        });

    } else if (request.method === 'PUT') {
        if (!methods[1]) {
            log.error(`Не правильное обращение к методу (${request.url})`);
            source.send404(response);
        }

        let msg = await getMsg(methods[1]);

        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        request.on('end', async () => {
            data = qs.parse(data);
            msg.item.text = data;
        });

    } else if (request.method === 'DELETE'){
        if (!methods[1]) {
            log.error(`Не правильное обращение к методу (${request.url})`);
            source.send404(response);
        }

        const dlgID = parser.parseJointID(methods[1]);
        const db = await Database.get();

        db.dialogs.findOne(dlgID)
            .exec()
            .then(async (doc) => {
                if (!doc) {
                    log.error(`Попытка удалить несуществующее сообщение (${request.url})`);
                    source.send404(response);
                } else {
                    await doc.remove();
                }
            });

        await db.destroy();

    } else {
        source.send404(response);
    };

}

const getMsg = async (id) => {
    const dlgID = parser.parseJointID(id)[0];
    const msgID = parser.parseJointID(id)[1];

    const db = await Database.get();

    return await db.dialogs.getMsg(dlgID, msgID);
};

const addMsg = async (dlgID, msgData) => {
    const db = await Database.get();

    return await db.dialogs.addMsg(dlgID, msgData);
};

module.exports.receiver = receiver;
