require("dotenv").config();

module.exports = {
  port: process.env["PORT"] || "8000",
  host: "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      additionalHeaders: ["token"]
    },
    payload: {
      maxBytes: 26214400
    }
  }
};
