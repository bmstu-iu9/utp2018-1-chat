'use strict'

const source = require('router/source');
const qs = require('querystring');

const handler = (resUrl, func, request, response) => {
    if (request.method === 'POST') {
        let data = '';
        request.on('data', (chunk) => {
            data += chunk.toString();
        });

        if (func === 'login') {
            request.on('end', () => {
                require('auth/login').signIn(response, qs.parse(data));
            });
        } else if (func === 'reg') {
            request.on('end', () => {
                require('auth/registration').signUp(response, qs.parse(data));
            });
        } else {
            source.send404(response);
        }
    }
}

module.exports.handler = handler;
