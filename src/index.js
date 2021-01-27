// import 'babel-polyfill' // eslint-disable-line import/no-unassigned-import
if (!global._babelPolyfill) {
  require("babel-polyfill");
}
/**
 * Module imports
 *
 **/
// import _ from 'lodash'
//import Glue from 'glue'
const Glue = require("glue");
require("dotenv").config();
/**
 * Project imports
 *
 **/
const Manifest = require("./manifest");
//import Manifest from './manifest'

var fs = require("fs");

//var key = fs.readFileSync('/v2/server/build/ssl/domain.key');
//var cert = fs.readFileSync( '/v2/server/build/ssl/domain.csr' );

const composeOptions = {
  relativeTo: __dirname
};

const composer = Glue.compose.bind(Glue, Manifest.get("/"), composeOptions);
composer((err, server) => {
  if (err) throw err;

  server.initialize(errInit => {
    if (err) throw errInit;

    server.start(() => {
      // const env = process.env.NODE_ENV;
      const env = process.env["NODE_ENV"]; //my test

      const msg = `${env} server started at ${server.info.uri}`;
      server.log(["server", "info"], msg);
    });
  });
});
module.exports = composer;
//export default composer
