require("dotenv").config();

const mongo = {};
mongo.url = {
  $filter: "env",
  development:
    process.env.MONGODB_URI ||
    "mongodb+srv://kouujaa:developer@cluster0.j6hef.mongodb.net/test",
  test:
    process.env.MONGODB_URI ||
    "mongodb+srv://kouujaa:developer@cluster0.j6hef.mongodb.net/test",
  sandbox:
    process.env.MONGODB_URI ||
    "mongodb+srv://kouujaa:developer@cluster0.j6hef.mongodb.net/test",
  production:
    process.env.MONGODB_URI ||
    "mongodb+srv://kouujaa:developer@cluster0.j6hef.mongodb.net/test",
  $default:
    process.env.MONGODB_URI ||
    "mongodb+srv://kouujaa:developer@cluster0.j6hef.mongodb.net/test"
};

module.exports = mongo;
