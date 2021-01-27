/**
 * Module imports
 *
 **/
require("dotenv").config();

//import Confidence from 'confidence'
const Confidence = require("confidence");

/**
 * Project imports
 *
 **/
const pkg = require("../../package.json");
const api = require("./api");
const apn = require("./apn");
const auth = require("./auth");
const general = require("./general");
const logging = require("./logging");
const migrations = require("./migrations");
const mongo = require("./mongo");
const server = require("./server");
// import pkg from '../../package.json'
// import api from './api'
// import apn from './apn'
// import auth from './auth'
// import general from './general'
// import logging from './logging'
// import migrations from './migrations'
// import mongo from './mongo'
// import server from './server'

const criteria = {
  env: process.env["NODE_ENV"]
};

const config = {
  $meta: "Our main server config",
  pkg,
  server,
  api,
  auth,
  general,
  logging,
  mongo,
  migrations,
  apn
};

const store = new Confidence.Store(config);

module.exports = {
  get: key => store.get(key, criteria)
};
