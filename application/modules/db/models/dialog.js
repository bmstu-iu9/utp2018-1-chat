'use strict'

const dialogSchema = {
    title: 'dialog schema',
    type: 'object',
    version: 0,
    properties: {
        id: {
            type: 'string',
            primary: true
        },
        kind: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        avatar: {
            type: 'string'
        },
        date: {
            type: 'string'
        },
        members: {
            type: 'array',
            uniqueItems: true,
            item: {
                type: 'string'
            },
            default: []
        },
        messages: {
            type: 'array',
            uniqueItems: true,
            item: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    kind: {
                        type: 'string'
                    },
                    text: {
                        type: 'string'
                    },
                    options: {
                        type: 'array',
                        uniqueItems: true,
                        item: {
                            type: 'string'
                        }
                    }
                }
            },
            default: []
        },
        pinned: {
            type: 'number'
        }

    },
    required: ['id', 'kind', 'date']
};

module.exports = dialogSchema;
