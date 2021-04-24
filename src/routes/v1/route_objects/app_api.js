const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
// const upload_s3_file  = require('../../../controllers/app_api/upload_s3_file');
const login = require("../../../controllers/app_api/login");
const change_password = require("../../../controllers/app_api/change_password");
const logout = require("../../../controllers/app_api/logout");
const googleLogin = require("../../../controllers/app_api/googleLogin");
register_route({
  router,
  route: "/login",
  auth_enable: false,
  post_method: login,
});
register_route({
  router,
  route: "/google_login",
  auth_enable: false,
  post_method: googleLogin,
});

register_route({
  router,
  route: "/change_password",
  auth_enable: true,
  post_method: change_password,
});

register_route({
  router,
  route: "/logout",
  auth_enable: true,
  get_method: logout,
});

// register_route({
//     router,
//     route: '/upload_s3_file',
//     auth_enable: false,
//     post_method: upload_s3_file
// });

module.exports = router;
