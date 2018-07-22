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
        time: {
            type: 'string'
        }

    },
    required: ['login', 'token', 'time']
};

module.exports = sessionSchema;
