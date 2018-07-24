'use strict'

module.exports.parse = (request) => {
    let list = {};
    let cookies = request.headers.cookie;

    cookies && cookies.split(';').forEach((cookie) => {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
