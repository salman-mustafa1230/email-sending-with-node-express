
const logger = require("./../../../common/logger");
const constant = require("./../../../common/constant.type");
// const nodemailer = require("nodemailer");
// var smtpTransport = require('nodemailer-smtp-transport');
const config = require('config');
const emailModel = require('./../../models/mail/email.model');
const emailHelper = require('./../../helpers/email.helper');
module.exports =  {
    
    sendEmail: async function (req, res, next) {
		const { body } = req;
		let emailTemplate = constant.emailTemplate.formTemplate;
		let emailTo = config.email.admin;
		if ( body.isFollowUpEmail ) {
			emailTemplate = constant.emailTemplate.followUpTemplate;
			emailTo = 'user email'; // i am considering one user
		}
		try {

			// FOR email templates we can add it in database table using CMS(email template pages on frontend) with unique identifier like en1, en2, en3 ... etc.
			// from end points we will know that which email we need to send
			//  so from database we will get the data based on unique identifier and replace the required field with dynamic data
			// and then by using nodemailer package we can send emails using AWS SES or other services
			// if we want to add new template simply we can add it in database
			// 
			/**
			 * subject: form email
			 * body: Dear {{userName}},
			 * {{submittedBy}} submitted some form details.
			 * {{formDetails}}
			 * Thank You
			 */
			// ******* NOTE *******//
			/** NOTE: 
			 * i am considering that i will be using database but if we are not using database then we can use template npm package and 
			 * can create template using html engin like pug (https://www.npmjs.com/package/email-templates)
			 */
			// ****** NOTE ****** //
			// get template by unique id
			const template = {
				subject: 'Form Email',
				body: `
					<div> hi</div>
				`
			}; // await emailModel.getTemplate(emailTemplate); // we can get it from database using unique key
			console.log("template", template);
			if ( !template ) {
				return next("There is no template.")
			}
			// replace content with dynamic values like subject and body
			const replaceArray = {
				key: 'value'
			}; // need to add key "field1" and value "salman mustafa" to be replaced in html
			const body = emailHelper.replaceArray(template.body, replaceArray);
			const subject = template.subject; // or you can replace it with any dynamic value
			const email = emailHelper.sendEmailNodeMailer(emailTo, subject, body); // email we can replace according to condition
			logger.info({type: "succesEmailSend", message: 'done'});
			return res.json({
				error: false,
				data: 'done',
			});
		} catch (e) {
			console.log('eeee', e);
			logger.error({type: "sendEmailError", message: e});
			next(e);
		}
      
	}
}