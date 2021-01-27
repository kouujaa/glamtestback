const Boom = require("boom");
const Hoek = require("hoek");
const stripe = require("stripe")(
  "sk_test_51HFG7nH08RyXN5rBhFHWUfyJ3DoboKDg676HVFHxOj1Wvh0SH6KkBJN4yc6xgyj97DKHgU4BXBa2gEro39KTUoGq00bhykwcJM"
);

const Joi = require("../../../validation");
const ServiceBookings = require("../../../models/serviceBookings");
const Salons = require("../../../models/salons");
const Users = require("../../../models/users");
const helpers = require("../../../helpers");
const EmailService = require("../../../services/email");
const SmsService = require("../../../services/sms");

let defaults = {};

const handler = async (request, reply) => {
  const userId = helpers.extractUserId(request);
  const payload = request.payload;

  const Stylist = await Users.findOne({ _id: payload.salon_user });

  try {
    // return stripe.customers.create({
    //     email: payload.token.email,
    //     source: payload.token.id,
    //     name: payload.token.card.name
    // })
    // .then(customer => {
    //     stripe.charges.create({
    //         amount: payload.totalPrice,
    //         currency: 'usd',
    //         customer: customer.id,
    //         receipt_email: payload.token.email,
    //         description: payload.salonName,
    //         shipping: {
    //             name: payload.token.card.name,
    //             address: {
    //                 line1: 'xyz',
    //                 country: payload.token.card.country
    //             }
    //         },
    //     })
    //     .then(async(result) => {

    //     })
    //     .catch(err => console.log(err))
    // })
    const bookingData = {
      userId: userId,
      salonsId: payload.salonId,
      salon_user: payload.salon_user,
      bookingName: payload.bookingName,
      bookingMobile: payload.bookingMobile,
      bookingDate: payload.bookingDate,
      email: payload.bookingEmail,
      serviceId: payload.service,
      salonName: payload.salonName,
      totalPrice: payload.totalPrice
      //customer_id: result.customer,
    };
    const ServiceBookingData = ServiceBookings(bookingData);
    await ServiceBookingData.save().then(res => {
      const Userbody = {
        email: payload.bookingEmail,
        subject: "Service booking confirmation",
        details: "<p>This is a service booking test email</p>"
      };
      const Stylistbody = {
        email: Stylist.profile.email,
        subject: `${payload.bookingName}  Service booking confirmed`,
        details: "<p>This is a service booking test email</p>"
      };
      EmailService.sendMail(Userbody, function(err, data) {});
      EmailService.sendMail(Stylistbody, function(err, data) {});
      const smsUserPayload = {
        message: "Your service is booked",
        to: payload.bookingMobile
      };
      const smsStylistPayload = {
        message: `${payload.bookingName} booked service`,
        to: Stylist.profile.mobile
      };

      // SmsService.sendSms(smsUserPayload, function(err, data){ })
      // SmsService.sendSms(smsStylistPayload, function(err, data){ })
    });
    return reply({
      status: true,
      message:
        "Thank you for booking with The GlamPlug. Please check your email for further instructions"
    });
  } catch (error) {
    return reply({
      status: false,
      message: error.message,
      data: {}
    });
  }

  // try{
  //     const data = {
  //         userId: userId,
  //         salonsId:payload.salonId,
  //         bookingDate: payload.bookingDate,
  //         serviceId:  payload.service
  //     }
  //     const ServiceBookingData = ServiceBookings(data)
  //     await ServiceBookingData.save()
  //     return reply({
  //         status: true,
  //         message: 'created successfully'
  //     })
  // }catch(error){
  //     return reply({
  //         status: false,
  //         message: error.message,
  //         data: {}
  //     })
  // }
};

/**
 * Route config
 *
 **/

const routeConfig = {
  method: "POST",
  path: "/addServiceBooking",
  config: {
    auth: "jwt",
    tags: ["api", "Add Service"],
    description: "Add Booking Service",
    notes: ["On success"],
    validate: {},
    handler
  }
};

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts);
  server.route(routeConfig);
};
