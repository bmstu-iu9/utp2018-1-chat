'use strict'

const source = require('router/source');

const auth = require('auth');

const Database = require('db');

module.exports.signup = async (response, data) => {
    const login = data['up-login'];
    const passData = auth.getHashPassword(data['up-password']);

    const db = await Database.get();

    db.users.findOne(login)
        .exec()
        .then((doc) => {
            if (doc !== null) return true;
            return false;
        })
        .then(async (val) => {
            if (val === true) {
                source.sendJSON(JSON.stringify({ status: 'Login is already taken' }), response);
            } else {
                await db.users.addUser(
                    login,
                    passData.passHash,
                    passData.salt,
                    new Date().toUTCString()
                );

                response.end(JSON.stringify({ status: `SUCCESS` }));
            }
        });
};
