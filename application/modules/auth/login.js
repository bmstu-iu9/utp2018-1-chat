'use strict'

const source = require('router/source');

const auth = require('auth');
const session = require('auth/session');

const Database = require('db');

module.exports.signin = async (response, data) => {
    const login = data['in-login'];

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
                data['in-password'],
                doc.get('salt')
            );

            if (postPassData.passHash === doc.get('password')) {
                const now = new Date();

                return {
                    flag: true,
                    json: {
                        login: login,
                        expires: new Date(now.getTime() + 30 * 11160000).toUTCString(),
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
                source.sendJSON(JSON.stringify({ status: 'Invalid password' }), response);
                return;
            }

            await session.addSession(data.json);

            response.writeHead(200, {
                'Set-Cookie': `session_token=${data.json.token}; expires=${data.json.expires}; path=/;`
            });

            response.end(JSON.stringify({ status: `SUCCESS` }));
        })
        .catch(
            // TODO : Error handler
        );
};
