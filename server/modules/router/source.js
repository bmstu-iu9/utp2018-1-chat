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
    'mp4': 'video/mp4'
};

const clientPath = path.join(__dirname, '..', '..', '..', 'client');

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
            'Content-Type': 'text/html'
        });

        stream.pipe(response);

        stream.on('error', (error) => {
            sendError(error, response);
        });
    }

    sendJSON(resUrl, pathName, response) {
        response.setHeader('Access-Control-Allow-Origin', resUrl);
        response.writeHead(200, {
            'Content-Type': mimeType['json']
        });

        response.end("{\"name\":\"UTP\"}");
    }

    sendError(error, response) {
        response.writeHeader((error.code === 'ENOENT') ? 404 : 500, {
            'Content-Type': mimeType['txt']
        });

        response.end(error.message);
    }

    send404(response) {
        response.writeHead(404, {
            'Content-Type': mimeType['txt']
        });
        
        response.end('404');
    }
}

module.exports = new Source;
