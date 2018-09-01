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
            type: 'string',
            default: 'personal'
        },
        title: {
            type: 'string',
            default: 'New dialog'
        },
        description: {
            type: 'string',
            default: ''
        },
        avatar: {
            type: 'string',
            default: 'default.jpg'
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
                    author: {
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
            type: 'number',
            default: -1
        }

    },
    required: ['id', 'kind', 'title', 'description', 'avatar', 'members',  'date']
};

module.exports = dialogSchema;
