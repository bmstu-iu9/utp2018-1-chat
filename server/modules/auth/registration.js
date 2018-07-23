'use strict'

const auth = require('auth');

const Database = require('db');

module.exports.signUp = async (response, data) => {
    const login = data.login;
    const passData = auth.getHashPassword(data.password);

    const db = await Database.get();

    db.users.findOne(login)
        .exec()
        .then((doc) => {
            if (doc !== null) return true;
            return false;
        })
        .then(async (val) => {
            if (val === true) {
                response.writeHead(422, {
                    'Content-Type': 'text/html'
                });

                response.end('Login is already taken')
            } else {
                await db.users.addUser(
                    login,
                    passData.passHash,
                    passData.salt,
                    new Date().toUTCString()
                );

                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                response.end(`ADD user ${login}`);
            }
        });
};
