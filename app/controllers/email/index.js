// const db = require('../../../common/db.js');
// var jwt = require('jsonwebtoken');
// const jwt_config = require('../../config/jwt_secret.js');
const logger = require("./../../../common/logger");

// const nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');
const config = require('config');

module.exports =  {
    
    sendEmail: async function (req, res, next) {
		
		try {
			logger.info({type: "succesEmailSend", message: 'done'})
			return res.json({
				error: false,
				data: 'done',
			});
		} catch (e) {
			next(e);
		}
      
	}
}