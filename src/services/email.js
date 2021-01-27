// import mg2 from '@sendgrid/mail'
// import AWS from 'aws-sdk'
// import fs from 'fs'

const mg2 = require("@sendgrid/mail");
const AWS = require("aws-sdk");
const fs = require("fs");

mg2.setApiKey(process.env["SENDGRID_API_KEY"]);

var EmailService = {
  sendMail: function(body, callback) {
    const sendData = {
      from: "theglamplug01@gmail.com",
      to: body.email,
      subject: body.subject,
      html: body.details
    };
    mg2
      .send(sendData)
      .then(m => {
        console.log("Mail sent");
        callback(true);
      })
      .catch(error => {
        console.error(error.toString());
        callback(false);
      });
  },
  sendMultipleMail: function(body, callback) {
    const sendData = {
      from: "theglamplug01@gmail.com",
      to: [body.email],
      subject: body.subject,
      html: body.details
    };
    mg2
      .send(sendData)
      .then(m => {
        console.log("Mail sent");
        callback(true);
      })
      .catch(error => {
        console.error(error.toString());
        callback(false);
      });
  },
  sendResetPasseordLink: function(body, callback) {
    console.log(body);
    const sendData = {
      from: "theglamplug01@gmail.com",
      to: body.to,
      subject: "Reset password Link",
      html: `<html>
            <head>
            </head>
            <body>
              <div>
                <table>
	              	<tr>
	                  <td>Link</td>
	                  <td><a href=${body.link}>${body.link}</a></td>
	                </tr>
              	</table>
              </div>
            </body>
            </html>`
    };
    mg2
      .send(sendData)
      .then(m => {
        console.log("Mail sent");
        callback(true);
      })
      .catch(error => {
        console.error(error.toString());
        callback(false);
      });
  },
  sendConfirmation: function(body, callback) {
    const sendUserData = {
      from: "theglamplug01@gmail.com",
      to: body.toUser,
      subject: "Confirmation Mail",
      html: `<html>
			  <head>
			  </head>
			  <body>
				<div>
				  <table>
						<tr>
						<td>Thank you to visit our website</td>
						<td>we will get back to you within 24 hours.</td>
					  </tr>
					</table>
				</div>
			  </body>
			  </html>`
    };
    mg2
      .send(sendUserData)
      .then(m => {
        console.log("Mail sent");
        callback(true);
      })
      .catch(error => {
        console.error(error.toString());
        callback(false);
      });
    const sendAdminData = {
      from: "theglamplug01@gmail.com",
      to: "theglamplug01@gmail.com",
      subject: "Confirmation Mail",
      html: `<html>
			  <head>
			  </head>
			  <body>
				<div>
				  <table>
						<tr>
						<td>Thank you to visit our website</td>
						<td>${body.email} visit on website and query is "${body.message}"</td>
					  </tr>
					</table>
				</div>
			  </body>
			  </html>`
    };
    mg2
      .send(sendAdminData)
      .then(m => {
        console.log("Mail sent");
        callback(true);
      })
      .catch(error => {
        console.error(error.toString());
        callback(false);
      });
  }
};

module.exports = EmailService;
