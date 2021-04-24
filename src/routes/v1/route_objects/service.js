const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const addService = require("../../../controllers/service/addService");
const listServices = require("../../../controllers/service/listServices");
const detailService = require("../../../controllers/service/detailService");
const deleteService = require("../../../controllers/service/deleteService");
const editService = require("../../../controllers/service/editService");

register_route({
  router,
  route: "/",
  auth_enable: true,
  admin_auth_enable: true,
  get_method: listServices,
});

register_route({
  router,
  route: "/add-service",
  auth_enable: true,
  admin_auth_enable: true,
  post_method: addService,
});

register_route({
  router,
  route: "/edit-service/:id",
  auth_enable: true,
  admin_auth_enable: true,
  post_method: editService,
});

register_route({
  router,
  route: "/detail-service/:id",
  auth_enable: true,
  admin_auth_enable: true,
  get_method: detailService,
});
register_route({
  router,
  route: "/delete-service/:id",
  auth_enable: true,
  admin_auth_enable: true,
  delete_method: deleteService,
});

module.exports = router;
