'use strict'

const converter = require('utils/converter');

/**
 * Конвертирует строку в Base64
 *
 * @param {string} str Исходная строка.
 * @return {string} Преобразованная строка в Base64.
 */
const parseCookie = (request) => {
    let list = {};
    let cookies = request.headers.cookie;

    cookies && cookies.split(';').forEach((cookie) => {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

/**
 * Получение из совмещенного индификатора, ID диалога и ID сообщения в нем
 *
 * @param {string} id Совмещенный msg ID.
 * @return {string} Массив [dlg_id, msg_id].
 */
const parseJointID = (id) => {
    return converter.toString(id).split(/\s*:\s*/);
}

module.exports.parseCookie = parseCookie;
module.exports.parseJointID = parseJointID;
