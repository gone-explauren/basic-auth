'use strict';

function error404(request, response, next) {
    response.status(404).send('Resource not found.');
}

module.exports = error404;