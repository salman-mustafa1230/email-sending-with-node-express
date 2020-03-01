var express = require('express')
var router = express.Router()
var validationMiddleware = require('../../middleware')();


module.exports = (app, controllers) => {

  // Send email using template
  router.get('/send-email', validationMiddleware.validation.validateUrlParams, controllers.email.sendEmail);
  
  return router;
  
}