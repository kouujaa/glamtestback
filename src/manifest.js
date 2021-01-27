/**
 * Module imports
 *
 **/
//import Confidence from 'confidence'
const Confidence = require("confidence");
/**
 * Project imports
 *
 **/
const AppConfig = require("./config");
//import AppConfig from './config'

const criteria = {
  env: process.env["NODE_ENV"]
};

const manifest = {
  $meta: "Our main server manifest",
  server: {},
  connections: [AppConfig.get("/server")],
  registrations: [
    { plugin: "hapi-auth-jwt2" },
    { plugin: "inert" },
    { plugin: "vision" },
    {
      plugin: {
        register: "hapi-swagger",
        options: AppConfig.get("/api")
      }
    },
    {
      plugin: {
        register: "good",
        options: AppConfig.get("/logging")
      }
    },
    {
      plugin: {
        register: "./mongo",
        options: AppConfig.get("/mongo")
      }
    },
    { plugin: "./responder" },
    {
      plugin: {
        register: "./auth",
        options: AppConfig.get("/auth")
      }
    },
    { plugin: "./hello" },
    { plugin: "./users" },
    { plugin: "./contact" },
    { plugin: "./admin/hairStylist" },
    { plugin: "./admin/hairTypes" },
    { plugin: "./admin/makeupArtist" },
    { plugin: "./admin/nailTech" },
    { plugin: "./admin/lashTech" },
    { plugin: "./admin/salons" },
    { plugin: "./admin/home" },
    { plugin: "./admin/NewsLetter" },
    { plugin: "./admin/pricePoints" },
    { plugin: "./admin/contactInfo" },
    { plugin: "./admin/orders" },
    { plugin: "./admin/sendMail" },
    { plugin: "./home/Salons" },
    { plugin: "./home/hairTypes" },
    { plugin: "./home/hairStyles" },
    { plugin: "./home/makeupArtist" },
    { plugin: "./home/nailTechs" },
    { plugin: "./home/lashTechs" },
    { plugin: "./home/Ratings" },
    { plugin: "./home/ServiceBooking" },
    { plugin: "./home/LandingPage" },
    { plugin: "./home/customersLoveUs" },
    { plugin: "./home/salonService" },
    { plugin: "./home/NewRating" },
    {
      plugin: {
        register: "./session",
        options: AppConfig.get("/auth")
      }
    }
  ]
};

const store = new Confidence.Store(manifest);

module.exports = {
  get: key => store.get(key, criteria),
  meta: key => store.meta(key, criteria)
};
