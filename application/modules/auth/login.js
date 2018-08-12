'use strict'

const auth = require('auth');
const session = require('auth/session');

const Database = require('db');

module.exports.signin = async (response, data) => {
    const login = data['user-in[login]'];

    const db = await Database.get();

    await db.users.findOne(login)
        .exec()
        .then((doc) => {
            if (!doc) {
                return {
                    flag: false,
                    json: null
                }
            }

            const postPassData = auth.getHashPassword(
                data['user-in[password]'],
                doc.get('salt')
            );

            if (postPassData.passHash === doc.get('password')) {
                const now = new Date();

                return {
                    flag: true,
                    json: {
                        login: login,
                        expires: new Date(now.getTime() + 30 * 60000).toUTCString(),
                        token: auth.getHashPassword(now.toUTCString()).passHash
                    }
                }
            } else {
                return {
                    flag: false,
                    json: null
                }
            }
        })
        .then(async (data) => {
            if (!data.flag || !data.json) {
                response.writeHead(422, {
                    'Content-Type': 'text/html'
                });

                response.end('Invalid password');
                return;
            }

            await session.addSession(data.json);

            // await db.sessions.dump().then(json => console.dir(json));

            response.writeHead(200, {
                'Set-Cookie': `session_token=${data.json.token}; expires=${data.json.expires}; path=/;`
            });

            response.end(`Hello, ${login}!`);
        })
        .catch(
            // TODO : Error handler
        );
};
