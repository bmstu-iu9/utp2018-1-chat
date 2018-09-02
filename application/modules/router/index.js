'use strict'

const url = require('url');
const path = require('path');
const source = require('router/source');
const api = require('api');
const session = require('auth/session');
const parser = require('utils/parser');

const fileExtension = /.(css|js|png|jpg|gif|svg|mp4|wav|ttf|woff|eot|otf)/;

// TODO : Организация модуля
class Router {
    constructor(urlSource) {
        this.urlSource = urlSource;
    }

    routing(request, response) {
        let pathName = url.parse(request.url).pathname;

        if (request.url.match(fileExtension)) {
            source.sendAsset(pathName, request, response);
        } else if (request.url.match(/api\/[a-z]/)) {
            const path = pathName.split('/');
            path.splice(0, 2);
            api.handler(path, request, response);
        } else {
            if (pathName === '/') {
                session.checkSession(parser.parseCookie(request).session_token, response)
                .then(data => {
                    if (data.flag === true) {
                        response.writeHead(302, {
                          'Location': '/chat'
                        });

                        response.end();
                    } else {
                        source.sendPage('auth', response);
                    }
                });
            } else if (pathName === '/chat') {
                session.checkSession(parser.parseCookie(request).session_token, response)
                .then(data => {
                    if (data.flag === true) {
                        source.sendPage('chat', response);
                    } else {
                        response.writeHead(302, {
                          'Location': '/'
                        });

                        response.end();
                    }
                });
            } else {
                source.send404(response);
            }
        }
    }
};

module.exports = Router;
