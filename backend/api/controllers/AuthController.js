/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

const bcrypt = require('bcrypt-nodejs'),
      createSendToken = require('../services/createSendToken');

module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function (req, res) {
        const login = req.body.login,
            password = req.body.password;

        if (!login || !password) {
            return res.status(401).send({
                message: "Login and password required"
            })
        }

        User.findOneByLogin(login, function (err, foundUser) {
            if (!foundUser) {
                return res.status(401).send({
                    message: "Login or password invalid"
                })
            }

            bcrypt.compare(password, foundUser.password, function (err, valid) {
                if (err) return res.status(403);

                if (!valid) {
                    return res.status(401).send({
                        message: 'Login or password invalid'
                    });
                }

                createSendToken(foundUser, res)
            })
        })
    },

    register: function (req, res) {
        const login = req.body.login,
              password = req.body.password;

        if (!login || !password) {
            return res.status(401).send({
                message: 'login and password required'
            })
        }

        User.create({
            login: login,
            password: password
        }).exec(function (err, user) {
            if (err) {
                const message = err.invalidAttributes && err.invalidAttributes.login && err.invalidAttributes.login.some(l => l.rule === 'unique')
                    ? 'User with such login already exists'
                    : 'Error while creating user';

                return res.status(403).send({ message });
            }

            createSendToken(user, res);
        })
    }
};

