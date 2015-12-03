'use strict';

const jwt = require('jwt-simple'),
      moment = require('moment');

module.exports = function (req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({
            message: 'Authentication failed'
        });
    }

    const authorizationSplitted = req.headers.authorization.split(' '),
          tokenType = authorizationSplitted[0],
          token = authorizationSplitted[1];

    if (tokenType !== 'Bearer') {
        return res.status(401).send({
            message: 'Authentication failed'
        })
    }

    const payload = jwt.decode(token, sails.config.auth.local.secret);

    if (!payload.sub || payload.exp < moment().unix()) {
        return res.status(401).send({
            message: 'Authentication failed'
        });
    }

    next();
}