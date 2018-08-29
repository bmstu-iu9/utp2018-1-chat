'use strict'

const source = require('router/source');
const qs = require('querystring');

const handler = (methods, request, response) => {
    console.log(request.method);

    switch (methods[0]) {
        case 'user':
            require('api/user').receiver(methods, request, response);
            break;

        case 'msg':
            require('api/msg').receiver(methods, request, response);
            break;

        case 'dialog':
            require('api/dialog').receiver(methods, request, response);
            break;

        case 'chart':
            // require('api/chart').receiver(methods, request, response);
            break;

        default:
            source.send404(response);

    }
}

module.exports.handler = handler;
