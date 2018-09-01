'use strict'

const fs   = require('fs');

const Database = require('db');

const config = require('log/config');

module.exports.format = async (level, date, message) => {
    return [level, ' [', date, '] ', message].join('');
}

module.exports.info = async (msg) => {
    if (config['method'] == 'console'){
        console.log ( '%c [Info]', 'color: green; font: 1.2rem/1 Tahoma;', new Date().toUTCString(), msg );

    } else if (config['method'] == 'file'){
        var now =
        fs.writeFile(config['wayForFile'], await format('info', new Date().toUTCString(),msg), function(error){
                if(error) throw error;
});
    } else {
        //Запись в БД
    }


};

/*
module.exports.info = info;
module.exports.error = error;
module.exports.warning = warning;
module.exports.trace = trace;
*/
/*
в самом модуле должны быть методы для вывода сообщения в лог. каждый такой метод принимает какой-нибудь текст.

методы:
.info() — для обычных сообщения
.error() — для критических ошибок
.warning() — для предупреждения
.trace() — для сообщений о вызове функций/выполнении действий
если вывод будет в консоль, то у каждого метода такого должен быть свой соответствующий цвет
причем не все сообщение
а лишь их префикс
например у info() префикс в начале лога [INFO]
у error() [ERROR]
а остальной текст белым просто, чтобы не было эффекта вырви глаз :)
ну и время еще после префикса писать нужно (new Data().toUTCString())
для записи в файл используй встроенный модуль fs
погугли про работу с ним
для записи в БД нужно использовать наш модуль db


kek['param2']


*/
