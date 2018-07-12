'use strict'

const crypto = require('crypto');   // TODO : crypt pass
const path = require('path');

class User {
    constructor(login, pass) {
        this.login = login;
        this.password = pass;
        this.friends = [];
        this.date = new Date().toISOString()
                            .replace(/T/, ' ')
                            .replace(/\..+/, '');
    }
}

module.exports = (login, pass) => { return new User(login, pass) };
