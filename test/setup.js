const chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.config.includeStack = true;

// Returns a standard Node.js HTTP server
const dynalite = require('dynalite');
const dynaliteApp = dynalite({ createTableMs: 0 });

// Listen on port 4567
const dbHost = 'http://localhost';
const dbPort = 4567;
const url = dbHost + ':' + dbPort;
process.env.DYNAMO_ENDPOINT = url;

dynaliteApp
  .once('listening', () => {
    console.info('Started Dynalite Server');
  })
  .once('error', err => {
    if (err.code !== 'EADDRINUSE') {
      throw err;
    }
    console.warn(`Dynalite dbPort :${dbPort} already in use.`);
  })
  .listen(dbPort);

const AWS = require('aws-sdk');
AWS.config.update({ endpoint: url, sslEnabled: false });

// DynamoDB Admin server.
const { createServer } = require('dynamodb-admin');
const adminApp = createServer();

const adminHost = 'http://localhost';
const adminPort = 8001;
const adminServer = adminApp.listen(adminPort);
adminServer.on('listening', () => {
  const address = adminServer.address();
  console.info(`  listening on ${adminHost}:${address.port}`);
});
