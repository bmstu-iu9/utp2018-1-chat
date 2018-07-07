const fs = require('fs');
const url = require('url');
const path = require('path');
const source = require('./source');

const fileExtension = /.(css|js|png|jpg|gif|svg)/

class App {
  constructor(urlSource) {
    this.urlSource = urlSource;
  }

  routing(req, response) {
    let pathName = url.parse(req.url).pathname;

    if (req.method == 'GET') {
      if (req.url.match(fileExtension)) {
        source.sendAsset(pathName, req, response);
      } else if (req.url.match(/api.[a-z]/)) {
        source.sendJSON(this.urlSource, pathName, response);
      } else {
        if (pathName === '/') {
          source.sendHome(response);
        } else {
          // TODO : 404
        }
      }
    }
  }
};

module.exports = App;
