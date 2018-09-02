'use strict'

const source = require('router/source');
const parser = require('utils/parser')
const qs = require('querystring');

const Database = require('db');
const status = require('db/status');

const receiver = async (methods, request, response) => {
    if (request.method === 'GET') {
        if (!methods[1]) {
            console.log('Не указан id');
            source.send404(response);
        }

        const db = await Database.get();
        
        db.sessions.findOne(methods[1])
            .exec()
            .then((doc) => {
                if (!doc) source.send404(response);

                source.sendJSON({ login: doc.get('login') }, response);
            });
    } else if (request.method === 'POST') {
        source.send404(response);
    } else if (request.method === 'PUT') {
        source.send404(response);
    } else if (request.method === 'DELETE'){
        source.send404(response);
    } else {
        source.send404(response);
    };

}

module.exports.receiver = receiver;
