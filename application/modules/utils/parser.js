'use strict'

const converter = require('utils/converter')

const parseCookie = (request) => {
    let list = {};
    let cookies = request.headers.cookie;

    cookies && cookies.split(';').forEach((cookie) => {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

const parseJointID = (id) => {
    return converter.toString(id).split(/\s*:\s*/);
}

module.exports.parseCookie = parseCookie;
module.exports.parseJointID = parseJointID;
