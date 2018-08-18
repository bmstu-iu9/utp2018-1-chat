'use strict'

const RxDB = require('rxdb');
RxDB.plugin(require('pouchdb-adapter-leveldb'));

const userSchema = require('db/models/user');
const sessionSchema = require('db/models/session');
const dialogSchema = require('db/models/dialog');

const path = require('path');

const Database = {};

Array.prototype.unset = (value) => {
    if(~this.indexOf(value)) {
        this.splice(this.indexOf(value), 1);
    }
}

const create = async () => {
    const uri = path.join(__dirname, '..', '..', 'data', 'gist')

    const db = await RxDB.create({
        name: uri,
        adapter: 'leveldb'
    });

    await createCollections(db);

    return db;
};

const createCollections = async (db) => {
    await db.collection({
        name: 'users',
        schema: userSchema,
        statics: {
            /**
             * Добавление пользователя в БД (регистрация)
             *
             * @param {string} login — индификатор пользователя.
             * @param {string} password — пароль пользователя.
             * @param {string} salt — соль.
             * @param {string} date — дата регистрации (UTC).
             */
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
            /**
             * Внесение сессии в БД
             *
             * @param {string} login — индификатор пользователя.
             * @param {string} token — строка с токеном.
             * @param {string} expires — дата сгорания сессии (UTC).
             */
            async addSession(login, token, expires) {
                return this.upsert({
                    login,
                    token,
                    expires
                });
            }
        }
    });

    await db.collection({
        name: 'dialogs',
        schema: dialogSchema,
        statics: {
            /**
             * Создние диалога в БД
             *
             * @param {string} id — ID диалога.
             * @param {string} kind — тип диалога.
             * @param {string} date — дата создания диалога (UTC).
             */
            async addDialog(id, kind, date) {
                return this.upsert({
                    id,
                    kind,
                    date
                });
            },

            /**
             * Добавление пользователя в диалог
             *
             * @param {string} id — ID диалога.
             * @param {string} login — индификатор пользователя.
             */
            async addMember(id, login) {
                this.findOne(id)
                    .exec()
                    .then(dlg => {
                        let members = dlg.get('members');
                        members.push(login);
                        dlg.set('members', members);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            /**
             * Удаление из диалога пользователя
             *
             * @param {string} id — ID диалога.
             * @param {string} login — индификатор пользователя.
             */
            async deleteMember(id, login) {
                this.findOne(id)
                    .exec()
                    .then(dlg => {
                        dlg.set('members', dlg.get('members').unset(login));
                    })
                    .catch(error => {
                        return error;
                    });
            }
        }
    });
};

let promise = null;
Database.get = async () => {
    if (!promise) {
        promise = create();
    }

    return promise;
};

module.exports = Database;
