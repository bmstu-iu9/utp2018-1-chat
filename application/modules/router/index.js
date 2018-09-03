'use strict'

const url = require('url');
const path = require('path');
const source = require('router/source');
const api = require('api');
const session = require('auth/session');
const parser = require('utils/parser');

const log = require('log');

const fileExtension = /.(css|js|png|jpg|gif|svg|mp4|wav|ttf|woff|eot|otf)/;

// TODO : Организация модуля
class Router {
    constructor(urlSource) {
        this.urlSource = urlSource;
    }

    routing(request, response) {
        let pathName = url.parse(request.url).pathname;

        if (request.url.match(fileExtension)) {
            log.trace('Перенаправление к сервису выдачи статики');
            source.sendAsset(pathName, request, response);
        } else if (request.url.match(/api\/[a-z]/)) {
            log.trace(`Обращение к API (${request.url})`);

            const path = pathName.split('/');
            path.splice(0, 2);
            api.handler(path, request, response);
        } else {
            if (pathName === '/') {
                session.checkSession(parser.parseCookie(request).session_token, response)
                .then(data => {
                    log.trace(`Проверка токена (${parser.parseCookie(request).session_token})`);
                    if (data.flag === true) {
                        response.writeHead(302, {
                          'Location': '/chat'
                        });

                        log.info(`Успешная проверка токена (${parser.parseCookie(request).session_token})`);

                        response.end();
                    } else {
                        log.info(`Проверка токена не пройдена (${parser.parseCookie(request).session_token})`);
                        source.sendPage('auth', response);
                    }
                });
            } else if (pathName === '/chat') {
                session.checkSession(parser.parseCookie(request).session_token, response)
                .then(data => {
                    log.trace(`Проверка токена (${parser.parseCookie(request).session_token})`);

                    if (data.flag === true) {
                        log.info(`Успешная проверка токена (${parser.parseCookie(request).session_token})`);

                        source.sendPage('chat', response);
                    } else {
                        log.info(`Проверка токена не пройдена (${parser.parseCookie(request).session_token})`);

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
