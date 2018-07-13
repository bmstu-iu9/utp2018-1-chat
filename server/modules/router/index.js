'use strict'

const fs = require('fs');
const url = require('url');
const path = require('path');
const source = require('./source');

const fileExtension = /.(css|js|png|jpg|gif|svg|mp4)/

class App {
    constructor(urlSource) {
        this.urlSource = urlSource;
    }

    routing(request, response) {
        let pathName = url.parse(request.url).pathname;

        if (request.method == 'GET') {
            if (request.url.match(fileExtension)) {
                source.sendAsset(pathName, request, response);
            } else if (request.url.match(/api.[a-z]/)) {
                source.sendJSON(this.urlSource, pathName, response);
            } else {
                if (pathName === '/') {
                    source.sendPage('auth', response);
                } else if (pathName === '/chat') {
                    source.sendPage('chat', response);
                } else if (pathName === '/chat_new') {
                    source.sendPage('chat_new', response);
                } else {
                    source.send404(response);
                }
            }
        }
    }
};

module.exports = App;
