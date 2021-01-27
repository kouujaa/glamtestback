/**
 * Module imports
 *
 **/

// import { get } from 'lodash'
// import Hoek from 'hoek'

const get = require("lodash/get");
const Hoek = require("hoek");

/**
 * Project imports
 *
 **/

// import helpers from '../../helpers'
// import Users from '../../models/users'
// import EmailService from '../../services/email'

const helpers = require("../../helpers");
const Users = require("../../models/users");
const EmailService = require("../../services/email");

/**
 * Setup
 *
 **/

let defaults = {};
const HOST = process.env["HOST"];

/**
 * Handler
 *
 **/

const handler = async (request, reply) => {
  const value = request.query;
  try {
    const data = await Users.find({ "profile.email": value.email });
    if (data) {
      let body = {};
      body.to = value.email;
      body.link = `${HOST}/update-password/${data[0]._id}`;
      EmailService.sendResetPasseordLink(body, function(val, data) {
        if (val === true) {
          return reply({
            status: true,
            message: "send Mail successfully"
          });
        } else {
          return reply({
            status: false,
            message: val.message,
            data: {}
          });
        }
      });
    } else {
      return reply({
        status: false,
        message: "Invalid Email Id",
        data: []
      });
    }
  } catch (error) {
    return reply({
      status: false,
      message: error.message,
      data: {}
    });
  }
};

/**
 * Route config
 *
 **/

const routeConfig = {
  method: "GET",
  path: "/ResetPasswordLink",
  config: {
    tags: ["api", "forget password"],
    description: "check email",
    notes: [],
    validate: {},
    handler
  }
};

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts);
  server.route(routeConfig);
};
