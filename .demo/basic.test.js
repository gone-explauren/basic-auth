'use strict'

const basicAuth = require('./basic.js')
const base64 = require ('base-64');

describe('Testing basic auth middleware', () => {
	test('Request contains all proper credentials, expect next to be called', () => {

		const encodedMessage = base64.encode('username:password');

		const request = {
			headers: {
				authorization: `Basic ${encodedMessage}`
			}
		};

		// if your middleware doesn't call a response, you don't need this, can go straight to next
		const response = {
			send: jest.fn(), // spy function
			status: jest.fn(),
			json: jest.fn(),
		};
		const next = jest.fn();

		basicAuth(request, response, next);
		expect(next).toHaveBeenCalled()
	});

	test('No credentials present, response 403 returned', () => {
		const request = {headers: {}};
		const response = {
			send: jest.fn(() => response),
			status: jest.fn(() => response),
			json: jest.fn(() => response),
		};
		const next = jest.fn();

		basicAuth(request, response, next);
		expect(response.status).toHaveBeenCalledWith(403);
		expect(response.send).toHaveBeenCalledWith('Invalid login');
	})
})