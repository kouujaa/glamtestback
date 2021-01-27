// const twilio = require("twilio")(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // const accountSid = process.env.TWILIO_ACCOUNT_SID
// // const authToken = process.env.TWILIO_AUTH_TOKEN

// // const client = new twilio(accountSid, authToken);

// var SmsService = {
//   sendSms: function(request, callback) {
//     twilio.messages
//       .create({
//         body: request.message,
//         to: request.to,
//         from: "+12065944890"
//       })
//       .then(message => {
//         console.log(message.sid);
//         callback(true);
//       })
//       .catch(err => {
//         console.error(err);
//         callback(false);
//       });
//   }
// };

// module.exports = SmsService;
