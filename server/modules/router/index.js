'use strict'

const url = require('url');
const path = require('path');
const source = require('router/source');
const api = require('router/api');
const session = require('auth/session');
const cookie = require('cookies');

const fileExtension = /.(css|js|png|jpg|gif|svg|mp4)/;

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
            api.handler(this.urlSource, pathName.split('/')[2], request, response);
        } else {
            if (pathName === '/') {
                // TODO : Структура
                session.checkSession(cookie.parse(request).session_token, response)
                    .then(data => {
                        if (data.flag === true) {
                            source.sendPage('chat_new', data.res);
                        } else {
                            source.sendPage('auth', response);
                        }
                    });
            } else if (pathName === '/chat') {
                source.sendPage('chat', response);
            } else if (pathName === '/chat_new') {
                source.sendPage('chat_new', response);
            } else {
                source.send404(response);
            }
        }
    }
};

module.exports = Router;
