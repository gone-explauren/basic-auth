'use strict';

const basicAuth = require('./basic');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { User } = require('../models/');

beforeAll( async() => {
    await User.sync();
});

afterAll( async() => {
    await User.drop();
});

describe('Testing basic authentication', () => {
    test('Credentials are being authenticated properly', async() => {
        const newUser = {
            username: 'Laurel',
            password: 'NaOH337!',
        };
        const encodedString = base64.encode(newUser.username + ':' + newUser.password);

        newUser.password = await bcrypt.hash(newUser.password, 10);
				
        const testUser = await User.create(newUser);

        const req = {
            headers: {
                authorization: `Basic ${encodedString}`,
            },
            body: {},
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
            send: jest.fn(() => res),
        };

        const next = jest.fn();
        await basicAuth(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});