
const config = require('config');

// we can use these packages for sending emails

// var nodeMailer = require("nodemailer");

// var aws = require('aws-sdk');
// aws.config.update({
//     "region": 'us-west-2',
//   });
// var ses = new aws.SES({apiVersion: '2010-12-01'});
// var transporter = nodeMailer.createTransport({
//     SES: ses
// });

class EmailHelper { 
    constructor() {}
    replaceArray (html, data) {
    if ( typeof data === 'object') {
      Object.keys(data).map((item, key) => {
        html = html.replace('{{' + item + '}}', data[item]);
      });
      console.log("htmll in", html);
      return html;
    } else {
      
    }
  }

  sendEmailNodeMailer ( email, subject, html, attachments = '') {
        var mailOptions = {
            to: email,
            from: config.email.username,
            subject: subject,
            html: html,
            attachments: attachments
        };
        return new Promise( (resolve, reject) => { 
            // transporter.sendMail(mailOptions, function (err) {
                
                // if (err) {
                //     console.log('errrrr', err);
                //     reject(err);
                // } else {
                //     console.log('ffff');
                //     resolve(true);
                // }
            // });
            resolve(true);
        });
    }
}

module.exports = new EmailHelper();