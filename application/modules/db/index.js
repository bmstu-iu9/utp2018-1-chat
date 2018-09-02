'use strict'

const path = require('path');

const RxDB = require('rxdb');
RxDB.plugin(require('pouchdb-adapter-leveldb'));

const status = require('db/status');

const userSchema = require('db/models/user');
const sessionSchema = require('db/models/session');
const dialogSchema = require('db/models/dialog');

const source = require('router/source');
const generator = require('utils/generator');

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

    await db.collection({
        name: 'dialogs',
        schema: dialogSchema,
        statics: {
            async addDialog(id, kind, title, description, avatar, members, date) {
                return this.upsert({
                    id,
                    kind,
                    title,
                    description,
                    avatar,
                    members,
                    date
                });
            },

            async getDialogs() {
                return this.find()
                    .exec()
                    .then(dialogs => {
                        return dialogs;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            async addMember(id, login) {
                this.findOne(id)
                    .exec()
                    .then(async (dlg) => {
                        let members = dlg.get('members');
                        members.push(login);
                        dlg.set('members', members);
                        await dlg.save();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            async deleteMember(id, login) {
                this.findOne(id)
                    .exec()
                    .then(async (dlg) => {
                        dlg.set('members', dlg.get('members').unset(login));
                        await dlg.save();
                    })
                    .catch(error => {
                        return error;
                    });
            },

            async addMsg(dlgID, msgData) {
                return this.findOne(dlgID)
                    .exec()
                    .then(async (dlg) => {
                        if (!dlg) {
                            return status.NON_EXISTENT_OBJ;
                        } else {
                            let messages = dlg.get('messages');

                            const msg = {
                                id: generator.genMsgID(dlgID),
                                kind: msgData['kind'],
                                text: msgData['text'],
                                author: msgData['author'],
                                options: msgData['options']
                            };

                            messages.push(msg);
                            dlg.set('messages', messages);
                            await dlg.save();

                            return status.SUCCESS;
                        }
                    })
                    .catch(error => {
                        console.log(error);
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
