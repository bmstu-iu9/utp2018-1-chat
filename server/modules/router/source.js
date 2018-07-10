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
    'js': 'text/javascript'
};

const clientPath = '../client';

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

        response.writeHead( 200, {
            'Content-Type': this.mime
        });

        this.stream.on('error', (error) => {
          this.sendError(error, response);
        });
    }

    sendHome(response) {
        const stream = fs.createReadStream(path.resolve(clientPath, 'index.html'));

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        stream.pipe(response);

        stream.on('error', (error) => {
            // TODO : Перенаправление на 404
            response.end('404');
        });
    }

    sendJSON(resUrl, pathName, response) {
      response.writeHead(200, {
          'Content-Type': mimeType['json']
      });
      response.setHeader('Access-Control-Allow-Origin', resUrl);

      response.end("{\"name\":\"UTP\"}");
    }

    sendError(error, response) {
        response.writeHeader((error.code === 'ENOENT') ? 404 : 500, {
            'Content-Type': mimeType['txt']
        });

        response.end(error.message);
    }

    // TODO : send404()
}

module.exports = new Source;
