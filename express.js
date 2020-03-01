const config = require("config");
const express = require("express");
const logger = require("./common/logger");
const ApiError = require("./common/ApiError");
const errors = require("./common/ErrorCodes");
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const _ = require('lodash');
const expressValidator = require('express-validator');
var fs = require('fs');
const helmet = require('helmet');

// const _logger = require('./helper/logger');

// var jwt = require('jsonwebtoken');
// var passport = require('passport');
// app.use(passport.initialize());
// require('./config/passport')(passport);

var cors = require('cors');

app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }),
  skip: () => {
    return false;
  }
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

// for security

app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));
app.use(helmet.featurePolicy({
    features: {
        vibrate: ["'none'"],
        geolocation: ["'none'"]
    }
  }));
  app.use(helmet.contentSecurityPolicy({
      directives:{
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        connectSrc: ["'self'"],
        
    }
}));
app.use(helmet());
// security end
app.use(expressValidator());
app.use(cors());
app.use('/api/v1', require('./app/routes')(app));

app.get('*', function (req, res, next) {
	res.status(404).json({message: "Page not found."});
});

app.use((req, res, next) => {  
  return next(new ApiError('Not Found', 404, errors.invalidUrl));
});

process.on('unhandledRejection', error => {
  // Won't execute
  console.log('unhandledRejection', error);
  // res.status(500).send('Unknown Error');
});

app.use((err, req, res, next) => {
  
  if (err.status) {
    let body = {
      message: err.message || "Unknown Error",
    };

    if (err.errorCode) {
      body.errorCode = err.errorCode;
    }
    body.error = true;
    // err.context = { mac: req.query.user };
    logger.error(err.message, req, {...err, ...{mac: req.query.user}});
    res.status(err.status).json(body);
  } else {
    if ( err.name == 'TokenExpiredError' ) {
      res.status(401).json({
        message: 'Token Expired',
        errorCode : 401
      });
    } 
    else {
      res.status(500).json({
        message: 'There is some error, please try again later.',
        errorCode : err.unknown
      });
    }
    logger.error(req, err);
    
  }
});

module.exports = {
  start: (port) => {
    const data = _.pick(config, ['isSetupServer', 'port', 'db']);
    data.env = process.env.NODE_ENV || '';
    console.log(`http server started at http://127.0.0.1:${port}.`);
    logger[data.env ? 'warn': 'error'](`http server started at http://127.0.0.1:${port}.`, data);
    app.listen(port, function() {
	});
    return app;
  },
};
