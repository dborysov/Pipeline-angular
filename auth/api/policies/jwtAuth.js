'use strict';

const jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    if(!req.headers || !req.headers.authorization) {
        return res.status(401).send({
            message: 'Authentication failed'
        });
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, "Key");

    if (!payload.sub) {
        return res.status(401).send({
            message: 'Authentication failed'
        });
    }

    next();
}