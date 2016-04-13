'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

function returnAuthFailed(res) {
    return res.status(401).send({
        message: 'Authentication failed'
    });
}

module.exports = function (req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        return returnAuthFailed(res);
    }

    const authorizationSplitted = req.headers.authorization.split(' ');
    const tokenType = authorizationSplitted[0];
    const token = authorizationSplitted[1];

    if (tokenType !== 'Bearer') {
        return returnAuthFailed(res)
    }

    let payload;
    try {
        payload = jwt.decode(token, sails.config.auth.local.secret, false, sails.config.auth.local.jwtSigningAlgorithm);
    }
    catch (e) {
        return returnAuthFailed(res)
    }
    if (!payload.sub || payload.exp < moment().unix()) {
        return returnAuthFailed(res)
    }

    next();
}