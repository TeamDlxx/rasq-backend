const Joi = require("joi");

function validateAdmin(user){
  const schema = {
    first_name : Joi.string().regex(/^[a-z A-Z]+$/).min(3).max(20).required().trim(),
    last_name  : Joi.string().regex(/^[a-z A-Z]+$/).min(3).max(20).required().trim(),
    address    : Joi.string().trim().allow(null, ''),
    email      : Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    password   : Joi.string().min(5).max(255).required().trim(),  
    contact_number  : Joi.string().trim().allow(null, ''),
    status          : Joi.boolean().required(),
    verification_code: Joi.string().trim(),
    is_send_code     : Joi.boolean(),
    is_verified_code : Joi.boolean()
  }
  return Joi.validate(user, schema);
}


function validateEditAdmin(user){
  const schema = {
    first_name : Joi.string().regex(/^[a-z A-Z]+$/).min(3).max(20).required().trim(),
    last_name  : Joi.string().regex(/^[a-z A-Z]+$/).min(3).max(20).required().trim(),
    address    : Joi.string().trim().allow(null, ''),
    contact_number  : Joi.string().trim().allow(null, ''),
    status          : Joi.boolean().required(),
  }
  return Joi.validate(user, schema);
}

// exports.validateAdmin = validateAdmin;
module.exports = {
  validateAdmin,
  validateEditAdmin
}