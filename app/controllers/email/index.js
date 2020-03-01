


// var jwt = require('jsonwebtoken');
// const jwt_config = require('../../config/jwt_secret.js');
const logger = require("./../../../common/logger");
const constant = require("./../../../common/constant.type");
// const nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');
const config = require('config');

module.exports =  {
    
    sendEmail: async function (req, res, next) {
		const { body } = req;
		let emailTemplate = constant.emailTemplate.formTemplate;
		if ( body.isFollowUpEmail ) {
			emailTemplate = constant.emailTemplate.followUpTemplate;
		}
		try {
			// FOR email templates we can add it in database table using CMS(email template pages on frontend) with unique identifier like en1, en2, en3 ... etc.
			// from end points we will know that which email we need to send
			//  so from database we will get the data based on unique identifier and replace the required field with dynamic data
			// and then by using nodemailer package we can send emails using AWS SES or other services
			/**
			 * subject: form email
			 * body: Dear {{userName}},
			 * {{submittedBy}} submitted some form details.
			 * {{formDetails}}
			 * Thank You
			 */
			logger.info({type: "succesEmailSend", message: 'done'});
			return res.json({
				error: false,
				data: 'done',
			});
		} catch (e) {
			logger.error({type: "sendEmailError", message: e})
			next(e);
		}
      
	}
}