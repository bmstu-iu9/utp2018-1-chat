'use strict'

const Database = require('db');

module.exports.addSession = async (sessionData) => {
    const db = await Database.get();

    await db.sessions.addSession(
        sessionData.login,
        sessionData.token,
        sessionData.expires
    );
};

module.exports.checkSession = async (token, response) => {
    if (!token) return {
        flag: false,
        res: response
    };

    const db = await Database.get();

    return db.sessions.findOne(token)
        .exec()
        .then((doc) => {
            if (!doc) return {
                flag: false,
                res: response
            };

            if (new Date().getTime() < new Date(doc.get('expires')).getTime()) {
                return {
                    login: doc.get('login'),
                    flag: true,
                    res: response
                };
            } else {
                doc.remove();

                response.writeHead(200, {
                    'Set-Cookie': `session_token=; expires=; path=/;`
                });

                return {
                    flag: false,
                    res: response
                };
            }
        });
};
