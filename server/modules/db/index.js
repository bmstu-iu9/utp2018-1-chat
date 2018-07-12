'use strict'

const level = require('level');
const path = require('path');

module.exports = (db) => {
    const uri = path.join(__dirname, '..', '..', 'data', db)

    return db = level(uri, { valueEncoding: 'json' });
};
