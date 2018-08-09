'use strict'

const sessionSchema = {
    title: 'session schema',
    type: 'object',
    version: 0,
    properties: {
        login: {
            type: 'string'
        },
        token: {
            type: 'string',
            primary: true
        },
        expires: {
            type: 'string'
        }

    },
    required: ['login', 'token', 'expires']
};

module.exports = sessionSchema;
