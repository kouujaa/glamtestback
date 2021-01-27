/**
 * Mongo
 * Sets up our mongo connection
 */

/**
 * Module imports
 *
 **/
// import Bluebird from "bluebird";
// import Hoek from "hoek";
// import Mongoose from "mongoose";

const Bluebird = require("bluebird");
const Hoek = require("hoek");
const Mongoose = require("mongoose");
require("dotenv").config();
/**
 * Project imports
 *
 */

/**
 * Setup
 *
 **/

Mongoose.Promise = Bluebird;
let defaults = {
  url:
    "mongodb+srv://kouujaa:developer@cluster0.j6hef.mongodb.net/the-glam-plug-staging?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
};
const serverOptions = {};
serverOptions.poolSize = 100;
serverOptions.autoReconnect = true;
serverOptions.socketOptions = {};
serverOptions.socketOptions.keepAlive = 1;
serverOptions.socketOptions.connectTimeoutMS = 300000;
serverOptions.socketOptions.socketTimeoutMS = 60000;

/**
 * Plugin
 *
 **/

exports.register = (server, options, next) => {
  defaults = Hoek.applyToDefaults(defaults, options);

  if (!Mongoose.connection.readyState) {
    // setup our connection
    server.log(
      `${process.env["NODE_ENV"]} server connecting to ${defaults.url}`
    );

    const options = {
      promiseLibrary: Bluebird,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };
    /*if (process.env.NODE_ENV === 'production') {
      // options.mongos = true
      options.db = { native_parser: true } // eslint-disable-line camelcase
      options.server = serverOptions
      options.replset = serverOptions
      // options.replset = { rs_name: 'myReplicaSetName' }
      // user: 'myUserName',
      // pass: 'myPassword'
    }*/
    // const options = {
    // db: { native_parser: true },
    // server: { poolSize: 5 },
    // replset: { rs_name: 'myReplicaSetName' },
    // user: 'v2@2212@#',
    // pass: 'Nyza2212@#houzzcart',
    // auth: {
    //    authdb: 'admin'
    // }
    // }
    //console.log(defaults.url);
    Mongoose.connect(defaults.url, options, err => {
      // console.log(err.message);
      err ? console.log(err.message) : null;
    }).then(() =>
      console.log(
        "Connected to MongoDB...",
        process.env["HOST"],
        process.env["NODE_ENV"]
      )
    );
  }

  // call the next item
  next();
};

exports.register.attributes = {
  name: "mongo"
};
