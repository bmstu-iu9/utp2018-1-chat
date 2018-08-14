'use strict'

const source = require('router/source');
const parser = require('utils/parser')
const qs = require('querystring');

const Database = require('db');

const receiver = async (methods, request, response) => {
    if (request.method === 'GET') {
        if (!methods[1]) {
            console.log('err');
            source.send404(response);
        }

        let msg = await getMsg(methods[1]);

        if (msg) {
            source.sendJSON(msg, response);
        }
    } else {
        source.send404(response);
    }

}

const getMsg = async (id) => {
    const dlgID = parser.parseJointID(id)[0];
    const msgID = parser.parseJointID(id)[1];

    const db = await Database.get();

    return await db.dialogs.getMsg(dlgID, msgID);
};

module.exports.receiver = receiver;
