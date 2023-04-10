'use strict';

require('dotenv').config();

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Prepare the express app
const app = express();

const PORT = process.env.PORT || 3002;
const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';

// Process JSON input and put the data on req.body
app.use(express.json());

const sequelize = new Sequelize(SQL_URL);

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(basicAuth);

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log('server up'));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });