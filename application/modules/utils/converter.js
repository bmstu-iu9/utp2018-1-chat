'use strict'


/**
 * Конвертирует строку в Base64
 *
 * @param {string} str Исходная строка.
 * @return {string} Преобразованная строка в Base64.
 */
const toBase64 = (str) => {
    return Buffer.from(str).toString('base64');
}

/**
 * Конвертирует Base64 в строку UTF8
 *
 * @param {string} base64 Преобразованная строка в Base64.
 * @return {string} Исходная строка в UTF8.
 */
const toString = (base64) => {
    return Buffer.from(base64, 'base64').toString('utf8');
};

module.exports.toBase64 = toBase64;
module.exports.toString = toString;
