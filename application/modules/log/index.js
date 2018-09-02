'use strict'

const fs   = require('fs');

const Database = require('db');

const config = require('log/config');

module.exports.format = async (level, date, message) => {
    return [level, ' [', date, '] : ', message].join('');
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

module.exports.format = async (level, date, prefix, message) => {
    return [level, ' [', date, '] ', prefix.toUpperCase(), message].join('');
}

module.exports.info = async (msg, prefix, col) => {
    if (config['method'] == 'console'){
        let datee = new Date().toUTCString();
        let textt = '[Info]' + ' [' + datee + '] : ' + prefix.toUpperCase() + ' ' + msg;
        let a = 0;
        let splitText = textt.split(' ');
        let cssRules = [];
        let styledText = '';
        for (var split of splitText)  {
            if (a == 0) {
                cssRules.push('color:green');
                a++;
            } else if (a == 8) {
                cssRules.push('color:' + col);
                a++;
            } else {
                cssRules.push('color:black')
                a++;
            }
            styledText += `%c${split} `
        };
        console.log(styledText , ...cssRules)

    } else if (config['method'] == 'file'){
        fs.writeFile(config['wayForFile', '/n'];
        fs.writeFile(config['wayForFile'], await format('Info', new Date().toUTCString(), prefix ,msg), function(error){
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
