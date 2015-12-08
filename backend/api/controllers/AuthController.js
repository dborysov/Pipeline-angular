/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

const bcrypt = require('bcrypt-nodejs'),
    createSendToken = require('../services/createSendToken'),
    request = require('request');

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
                });
            }

            if (!foundUser.password) {
                return res.status(401).send({
                    message: "You should use Google authorization"
                });
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
    },

    google: (req, res) => {
        const url = 'https://accounts.google.com/o/oauth2/token',
              apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

        const params = {
            client_id: req.body.clientId,
            redirect_uri: req.body.redirectUri,
            code: req.body.code,
            grant_type: 'authorization_code',
            client_secret: sails.config.auth.google.secret
        }

        request.post(url, { json: true, form: params }, handleGoogleRequest);

        function handleGoogleRequest(err, response, token) {
            const accessToken = token.access_token;
            const headers = { Authorization: `Bearer ${accessToken}` };
            const params = { url: apiUrl, headers, json: true };

            request.get(params, handleGooglePlusRequest);
        }

        function handleGooglePlusRequest(err, response, profile) {
            User.findOne({ googleId: profile.sub }, (err, foundUser) => {
                if (foundUser) return createSendToken(foundUser, res);

                User.create({
                    login: profile.email,
                    googleId: profile.sub
                }).exec((err, user) => {
                    createSendToken(user, res);
                })
            })
        }
    }
};

