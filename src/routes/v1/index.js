const admin = require("./route_objects/admin");
const app_api = require("./route_objects/app_api");
const index = require("../index");
const user = require("./route_objects/user");
const customer = require("./route_objects/customer");
const v1_routes = (app) => {
  app.use("/", index);
  app.use("/api/user", user);
  app.use("/api/customer", customer);
  app.use("/api/app_api", app_api);
  app.use("/api/admin", admin);
};

module.exports = { v1_routes };
