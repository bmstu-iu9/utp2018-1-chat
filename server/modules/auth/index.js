'use strict'

const crypto = require('crypto');

const SALT_LENGTH = 48;

const genSalt = () => {
    return crypto.randomBytes(Math.ceil(SALT_LENGTH / 2))
            .toString('hex')
            .slice(0, SALT_LENGTH);
};

const _sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);

    return {
        salt: salt,
        passHash: hash.digest('hex')
    };
};

const getHashPassword = (password, salt) => {
    if (salt === undefined) {
        return _sha512(password, genSalt());
    } else {
        return _sha512(password, salt);
    }
}

module.exports.genSalt = genSalt;
module.exports.getHashPassword = getHashPassword;
