const Joi = require("joi");
function validateUser(user) {
  const schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    password: Joi.string().min(5).max(255).required().trim(),
    type: Joi.number().required(),
  };
  return Joi.validate(user, schema);
}

function validatePassword(user) {
  const schema = {
    old_password: Joi.string().min(5).max(255).required().trim(),
    new_password: Joi.string().min(5).max(255).required().trim(),
    confirm_password: Joi.string().min(5).max(255).required().trim(),
  };
  return Joi.validate(user, schema);
}
function validateGooleLogin(googleLogin) {
  const schema = {
    access_token: Joi.string().required().trim(),
  };
  return Joi.validate(googleLogin, schema);
}

module.exports = {
  validateUser,
  validatePassword,
  validateGooleLogin,
};
// exports.validateUser = validateUser;
