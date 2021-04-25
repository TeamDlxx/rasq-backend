const Joi = require("joi");
function validateUser(user) {
  const schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    password: Joi.string().min(5).max(255).required().trim(),
    type: Joi.number().required(),
  };
  return Joi.validate(user, schema);
}
module.exports = {
  validateUser,
};
