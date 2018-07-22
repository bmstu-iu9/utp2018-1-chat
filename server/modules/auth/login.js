'use strict'

const auth = require('auth');
const session = require('auth/session');

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
                const now = new Date();
                const sessionData = {
                    login: login,
                    expires: new Date(now.getTime() + 30 * 60000).toUTCString(),
                    token: auth.getHashPassword(now.toUTCString()).passHash
                };

                // console.log(JSON.stringify(sessionData, null, 4));
                session.addSession(sessionData);

                response.writeHead(200, {
                    'Set-Cookie': `session_token=${sessionData.token}; expires=${sessionData.expires}; path=/;`
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
