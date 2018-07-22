'use strict'

const RxDB = require('rxdb');
RxDB.plugin(require('pouchdb-adapter-leveldb'));

const userSchema = require('db/models/user');
const sessionSchema = require('db/models/session');

const path = require('path');

const Database = {};

const create = async () => {
    const uri = path.join(__dirname, '..', '..', 'data', 'gist')

    const db = await RxDB.create({
        name: uri,
        adapter: 'leveldb'
    });

    await db.collection({
        name: 'users',
        schema: userSchema,
        statics: {
            async addUser(login, password, salt, date) {
                return this.upsert({
                    login,
                    password,
                    salt,
                    date
                });
            }
        }
    });

    await db.collection({
        name: 'sessions',
        schema: sessionSchema,
        statics: {
            async addSession(login, token, expires) {
                return this.upsert({
                    login,
                    token,
                    expires
                });
            }
        }
    });

    return db;
};

let promise = null;
Database.get = async () => {
    if (!promise) {
        promise = create();
    }

    return promise;
};

module.exports = Database;
