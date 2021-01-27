const migrations = {};

migrations.from = {
  $filter: "env",
  sandbox: process.env["MONGODB_URI"],
  $default:
    "mongodb+srv://root:admin@cluster0-syfz2.mongodb.net/glamplug?retryWrites=true&w=majority"
};

migrations.to = {
  $filter: "env",
  sandbox: process.env["MONGODB_URI"],
  development: "mongodb://mongo/hapi",
  $default:
    process.env.MONGODB_URI ||
    "mongodb+srv://root:admin@cluster0-syfz2.mongodb.net/glamplug?retryWrites=true&w=majority"
};

module.exports = Object.freeze(migrations);
