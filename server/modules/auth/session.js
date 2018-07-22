'use strict'

const Database = require('db');

module.exports.addSession = async (sessionData) => {
    const db = await Database.get();

    db.sessions.addSession(
        sessionData.login,
        sessionData.token,
        sessionData.expires
    );
};
