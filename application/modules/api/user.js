'use strict'

const qs = require('querystring');

const log = require('log');

const Database = require('db');

const receiver = async (methods, request, response) => {
    console.log(methods);

    if (request.method === 'GET') {
        if (!methods[1])
            log.error(`Не правильное обращение к методу (${request.url})`);

        let userInfo = getUserInfo(methods[1]);

        const db = await Database.get();

        db.users.findOne(login)
            .exec()
            .then(async (doc) => {
                if (doc == null) {
                    response.writeHead(204, {
                        'Content-Type': 'text/html'
                    });

                    response.end('User doesn\'t exist')

                } else {

                    let userr = {
                        login: doc.get('login'),
                        date: doc.get('date')
                    };

                    response.writeHead(200, {
                        'Content-Type': 'application/json'
                    });

                    response.end(JSON.stringify(userr))
                }
            });
    } else if (request.method === 'POST') {
        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        request.on('end', () => {
            if (methods[1] === 'signin')
                require('auth/login').signin(response, qs.parse(data));
            else if (methods[1] === 'signup')
                require('auth/registration').signup(response, qs.parse(data));
        });

    } else if (request.method === 'PUT') {
    } else if (request.method === 'DELETE') {

        const db = await Database.get();
        let login = db.users.findOne(methods[1]).login.type;
        db.users.findOne(login)
            .exec()
            .then(async (doc) => {
                if (!doc) {
                    response.writeHead(204, {
                        'Content-Type': 'text/html'
                    });

                    response.end('User doesn\'t exist')
                } else {
                    await doc.remove();

                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    response.end(`DELETE user ${login}`);
                }
            });

        await db.destroy();
    } else {
        source.send404(response);
    }

}

module.exports.receiver = receiver;
