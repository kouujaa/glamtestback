/**
 * System imports
 *
 **/

/**
 * Module imports
 *
 **/
//import SlackService from '../services/slack'
const SlackService = require("../services/slack");
/**
 * Setup
 *
 **/

const slackNotification = (title, err, color = "#ff0000") => {
  const Slack = new SlackService();
  const msg = JSON.stringify(err);
  const options = {
    fallback: title,
    color,
    fields: [
      {
        title,
        value: msg,
        short: false
      }
    ]
  };
  switch (process.env["NODE_ENV"]) {
    case "production":
      return Slack.send(title, "deployment-web", options);
    case "sandbox":
      return Slack.send(title, "sandbox-web", options);
    default:
      break;
  }
};

/**
 * Plugin
 *
 **/

exports.register = (server, options, next) => {
  process.on("uncaughtException", err => {
    console.error("Caught exception: ", err); // eslint-disable-line no-console
    return slackNotification("Caught exception", err);
  });

  // http://bluebirdjs.com/docs/api/error-management-configuration.html
  // NOTE: event name is camelCase as per node convention
  process.on("unhandledRejection", (reason, promise) => {
    // See Promise.onPossiblyUnhandledRejection for parameter documentation
    console.error("Caught unhandledRejection: ", reason, " promise: ", promise); // eslint-disable-line no-console
    return slackNotification(`Caught unhandledRejection ${reason}`, promise);
  });

  // NOTE: event name is camelCase as per node convention
  process.on("rejectionHandled", promise => {
    // See Promise.onUnhandledRejectionHandled for parameter documentation
    console.error("Caught rejectionHandled promise: ", promise); // eslint-disable-line no-console
    return slackNotification("Caught rejectionHandled", promise, "#fcff00");
  });

  next();
};

exports.register.attributes = {
  name: "error"
};
