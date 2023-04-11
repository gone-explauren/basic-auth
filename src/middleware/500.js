'use strict';

function error500(err, request, response, next) {
    console.log(err);
    response.status(500).send('Internal server error.');
}

module.exports = error500;