'use strict';

const jwt = require('jwt-simple'),
      moment = require('moment');

module.exports = function (user, res) {
    const payload = {
        sub: user.id,
        login: user.login,
        exp: moment().add(10, 'days').unix()
    }

    const token = jwt.encode(payload, sails.config.auth.local.secret, sails.config.auth.local.jwtSigningAlgorithm);

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};