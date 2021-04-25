const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const signup = require("../../../controllers/admin/signup");
const detail_admin = require("../../../controllers/admin/detail_admin");
const edit_admin = require("../../../controllers/admin/edit_admin");

register_route({
  router,
  route: "/signup_admin",
  auth_enable: false,
  post_method: signup,
});

register_route({
  router,
  route: "/edit_admin/:id",
  auth_enable: true,
  admin_auth_enable: true,
  post_method: edit_admin,
});

register_route({
  router,
  route: "/detail_admin/:id",
  auth_enable: true,
  admin_auth_enable: true,
  get_method: detail_admin,
});

module.exports = router;
