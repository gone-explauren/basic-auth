'use strict'

// Basic authentication:
// 1) sending HTTP requests
// 2) check that our request has basic auth credentials:
// // headers have authorization property (encoded username and password)
// 3) if credentials are there, everything is good, call next function (allow access)
// // if no credentials, call error handler
// // if username is not found or password is incorrect, call error handler / send error status

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const express = require('express');
const { User } = require('../models');

async function basicAuth(req, res, next) {
    const credentials = req.headers.authorization.split(' ')[1];
    const decoded = base64.decode(credentials);
    const extracted = decoded.split(':');
    const username = extracted[0];
    const password = extracted[1];

    try {
        const thisUser = await User.findOne({where: { username: username }});
        const valid = await bcrypt.compare(password, thisUser.password);
        if (valid) {
            req.body = thisUser;
            next();
        } else {
            throw new Error ('User not found.');
        }
    } catch (e) {
        res.status(403).send('Invalid credentials');
    }
}

module.exports = basicAuth;