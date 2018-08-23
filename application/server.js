// Упрощаем импорт собственных модулей
require('app-module-path').addPath(__dirname + '/modules');

const http = require('http');
const Router = require('router');

const Database = require('db');

const port = 8080;

const router = new Router(`http://localhost:${port}`);

const server = http.createServer((request, response) => {
    router.routing(request, response);
});

server.listen(port, 'localhost', () => {
    console.log(`Сервер запущен: http://localhost:${port}`);
});
