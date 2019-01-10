// const result = require('dotenv').config();
// if (result.error) {
//   throw result.error;
// }

var chai = require('chai');
chai.config.includeStack = true;

// Returns a standard Node.js HTTP server
var dynalite = require('dynalite');
var dynaliteServer = dynalite({ createTableMs: 0 });

// Listen on port 4567
var host = 'http://localhost';
var port = 4567;
var url = host + ':' + port;

dynaliteServer
  .once('error', err => {
    if (err.code !== 'EADDRINUSE') {
      throw err;
    }
  })
  .listen(port);

var AWS = require('aws-sdk');
AWS.config.update({ endpoint: url, sslEnabled: false });

var dynamose = require('dynamoose');
dynamose.local(url);
