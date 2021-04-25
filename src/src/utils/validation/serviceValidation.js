const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validateService(service) {
  const schema = {
    title: Joi.string().required().trim(),
    icon: Joi.string().trim().allow(null, ""),
    status: Joi.boolean().required(),
    parent_id: Joi.objectId(),
    documents: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        type: Joi.string().required().valid("image", "pdf"),
      })
    ),
  };
  return Joi.validate(service, schema);
}

function validateEditService(service) {
  const schema = {
    title: Joi.string().required().trim(),
    icon: Joi.string().trim().allow(null, ""),
    status: Joi.boolean().required(),
    order: Joi.number().required(),
    documents: Joi.array().items(
      Joi.object({
        _id: Joi.objectId(),
        title: Joi.string().required(),
        type: Joi.string().required().valid("image", "pdf"),
      })
    ),
  };
  return Joi.validate(service, schema);
}

module.exports = {
  validateService,
  validateEditService,
};
