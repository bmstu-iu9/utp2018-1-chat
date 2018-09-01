'use strict'

const fs   = require('fs');

const Database = require('db');

const config = require('log/config');

module.exports.format = async (level, date, message) => {
    return [level, ' [', date, '] ', message].join('');
}

module.exports.info = async (msg) => {
    if (config['method'] == 'console'){
        console.log ( '%c [Info]', 'color: green;', ' [', new Date().toUTCString(), '] : ', msg );

    } else if (config['method'] == 'file'){
        fs.writeFile(config['wayForFile', '/n'];
        fs.writeFile(config['wayForFile'], await format('Info', new Date().toUTCString(),msg), function(error){
                if(error) throw error;
});
    } else {
        //Запись в БД
    }
};

module.exports.error = async (msg) => {
    if (config['method'] == 'console'){
        console.log ( '%c [Error]', 'color: red;', ' [', new Date().toUTCString(), '] : ', msg );

    } else if (config['method'] == 'file'){
        fs.writeFile(config['wayForFile', '/n'];
        fs.writeFile(config['wayForFile'], await format('Error', new Date().toUTCString(),msg), function(error){
                if(error) throw error;
});
    } else {
        //Запись в БД
    }
};

module.exports.warning = async (msg) => {
    if (config['method'] == 'console'){
        console.log ( '%c [Warning]', 'color: orange;', ' [', new Date().toUTCString(), '] : ', msg );

    } else if (config['method'] == 'file'){
        fs.writeFile(config['wayForFile', '/n'];
        fs.writeFile(config['wayForFile'], await format('Warning', new Date().toUTCString(),msg), function(error){
                if(error) throw error;
});
    } else {
        //Запись в БД
    }
};

module.exports.trace= async (msg) => {
    if (config['method'] == 'console'){
        console.log ( '%c [Trace]', 'color: purple;', ' [', new Date().toUTCString(), '] : ', msg );

    } else if (config['method'] == 'file'){
        fs.writeFile(config['wayForFile', '/n'];
        fs.writeFile(config['wayForFile'], await format('Warning', new Date().toUTCString(),msg), function(error){
                if(error) throw error;
});
    } else {
        //Запись в БД
    }
};
