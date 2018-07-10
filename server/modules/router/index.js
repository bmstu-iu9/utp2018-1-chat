const fs = require('fs');
const url = require('url');
const path = require('path');
const source = require('./source');

const fileExtension = /.(css|js|png|jpg|gif|svg)/

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
          source.sendHome(response);
        } else {
          // TODO : response 404 page
        }
      }
    }
  }
};

module.exports = App;
