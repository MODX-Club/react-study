/* eslint consistent-return:0 */

require('babel-core/register');

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const resolve = require('path').resolve;
const app = express();

// var bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 
// app.use(bodyParser.json());       // to support JSON-encoded bodies


// In production we need to pass these values in instead of relying on webpack
setup(app, {
	outputPath: resolve(process.cwd(), 'build'),
	publicPath: '/',
});


// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
	if (err) {
		return logger.error(err.message);
	}
	logger.appStarted(port);
});
