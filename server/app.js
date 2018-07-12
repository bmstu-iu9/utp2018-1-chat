const http = require('http');
const Router = require('./modules/router');

var port = 8080;

const app = new Router(`http://localhost:${port}`);

const server = http.createServer((request, response) => {
  app.routing(request, response);
});

server.listen(port, 'localhost', () => {
  console.log(`Сервер запущен: http://localhost: ${port}`);
});
