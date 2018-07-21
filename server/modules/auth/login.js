'use strict'

const auth = require('auth');

const Database = require('db');

module.exports.signIn = async (response, data) => {
    const login = data.login;

    const db = await Database.get();

    db.users.findOne(login)
        .exec()
        .then((doc) => {
            const postPassData = auth.getHashPassword(
                data.password,
                doc.get('salt')
            );

            if (postPassData.passHash === doc.get('password')) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                response.end(`Hello, ${login}!`);
            } else {
                response.writeHead(422, {
                    'Content-Type': 'text/html'
                });

                response.end('Invalid password');
            }
        })
        .catch(
            // TODO : Error handler
        );
};
