'use strict'

const http = require('http')
const fs = require('fs');
const os = require('os');
const path = require('path');

const mimeType = {
    'gif': 'image/gif',
    'jpg': 'image/jpg',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'json': 'application/json',
    'txt': 'text/plain',
    'html': 'text/html',
    'md': 'text/markdown',
    'css': 'text/css',
    'js': 'text/javascript',
    'mp4': 'video/mp4',
    'wav': 'audio/vnd.wave',
    'ttf': 'application/x-font-truetype',
    'eot': 'application/vnd.ms-fontobject',
    'woff': 'application/font-woff',
    'woff2': 'application/font-woff2',
    'otf': 'font/opentype',
};

const clientPath = path.join(__dirname, '..', '..', 'public');

class Source {
    constructor() {
        this.file;
        this.mime;
        this.stream;
    }

    sendAsset(file, request, response) {
        this.file = request.url.substr(1);

        this.mime = mimeType[path.extname(request.url).substr(1)];

        this.stream = fs.createReadStream(path.resolve(clientPath, this.file));
        this.stream.pipe(response);

        response.writeHead(200, {
            'Content-Type': this.mime
        });

        this.stream.on('error', (error) => {
            this.sendError(error, response);
        });
    }

    sendPage(page, response) {
        const stream = fs.createReadStream(path.resolve(clientPath, 'pages', `${page}.html`));

        response.writeHead(200, {
            'Content-Type': mimeType['html']
        });

        stream.pipe(response);

        stream.on('error', (error) => {
            this.sendError(error, response);
        });
    }

    sendJSON(data, response) {
        response.writeHead(200, {
            'Content-Type': mimeType['json']
        });

        response.end(JSON.stringify(data));
    }

    sendError(error, response) {
        response.writeHeader((error.code === 'ENOENT') ? 404 : 500, {
            'Content-Type': mimeType['html']
        });

        response.end(error.message);
    }

    send404(response) {
        response.writeHead(404, {
            'Content-Type': mimeType['html']
        });

        response.end('404');
    }
}

module.exports = new Source;
