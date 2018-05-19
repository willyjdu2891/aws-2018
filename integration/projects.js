'use strict';

var urljoin = require('url-join');
var projectsServer = (process.env.PROJECTS_URL || 'https://aws1718-01.herokuapp.com/api/v1');
var projectsKey = 'aws1718';

module.exports = function(url) {
    return urljoin(projectsServer, url, '?apikey='+projectsKey);
};