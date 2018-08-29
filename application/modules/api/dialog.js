'use strict'

const source = require('router/source');
const qs = require('querystring');

const Database = require('db');
const status = require('db/status');

const generator = require('utils/generator');

const receiver = async (methods, request, response) => {
    console.log(methods);

    if (request.method === 'GET') {
        if (!methods[1]) {
            console.log('err');
            source.send404(response);
        }

        source.sendJSON(await getDialog(methods[1]), response);
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
                new Date().toUTCString()
            );

            source.sendJSON(JSON.stringify(newDialog), response);
        });

    } else if (request.method === 'PUT') {

        if (!methods[1]) {
            console.log('err');
            source.send404(response);
        }

        const db = await Database.get();

        let dlg = await db.dialogs.findOne(methods[1]);

        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        request.on('end', async () => {
            data = qs.parse(data);

            data.on('kind', (anotherText1) =>{
                dlg.kind = anotherText1;
            });
            data.on('title', (anotherText2) =>{
                dlg.title = anotherText2;
            });
            data.on('description', (anotherText3) =>{
                dlg.description = anotherText3;
            });
            data.on('avatar', (anotherText4) =>{
                dlg.avatar = anotherText4;
            });
            data.on('members', (anotherText5) =>{
                dlg.members = anotherText5;
            });
        });

        await db.destroy();

    } else if (request.method === 'DELETE') {

        if (!methods[1]) {
            console.log('err');
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
