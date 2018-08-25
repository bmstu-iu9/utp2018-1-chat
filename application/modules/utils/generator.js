'use strict'

const converter = require('utils/converter');

const genMsgID = (dlgID) => {
    const strID = `${dlgID}:${Math.random().toString(36).substr(2, 8)}`;

    return converter.toBase64(strID);
}

const genDialogID = () => {
    const strID = Math.random().toString(36).substr(2, 5);

    return converter.toBase64(strID);
}

module.exports.genMsgID = genMsgID;
module.exports.genDialogID = genDialogID;
