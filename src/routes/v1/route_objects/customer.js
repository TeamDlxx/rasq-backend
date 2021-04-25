const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const codeVerfication = require("../../../controllers/customer/codeVerfication");

register_route({
  router,
  route: "/code_verification/:code",
  auth_enable: true,
  admin_auth_enable: false,
  get_method: codeVerfication,
});

module.exports = router;
