'use strict'

const userSchema = {
    title: 'user schema',
    type: 'object',
    version: 0,
    properties: {
        login: {
            type: 'string',
            primary: true
        },
        password: {
            type: 'string'
        },
        salt: {
            type: 'string'
        },
        firstname: {
            type: 'string'
        },
        lasttname: {
            type: 'string'
        },
        bio: {
            type: 'string'
        },
        friends: {
            type: 'array',
            uniqueItems: true,
            item: {
                type: 'string'
            }
        },
        dialogs: {
            type: 'array',
            uniqueItems: true,
            item: {
                type: 'number'
            }
        },
        birthday: {
            type: 'string'
        },
        date: {
            type: 'string'
        },
        online: {
            type: 'boolean'
        }

    },
    required: ['login', 'password', 'salt', 'date']
};

module.exports = userSchema;
