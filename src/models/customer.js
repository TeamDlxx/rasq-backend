const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: false,
    maxlength: 20,
    trim: true,
    default: "",
  },
  profile_image: {
    type: String,
    trim: true,
    default: "",
  },
  contact_number: {
    type: String,
    trim: true,
    default: "",
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  verification_code: {
    type: String,
    trim: true,
    default: "",
  },
  is_send_code: {
    type: Boolean,
    default: false,
  },
  is_verified_code: {
    type: Boolean,
    default: false,
  },
});

customerSchema.plugin(timestamps);

customerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  const customerJson = _.pick(customerObject, [
    "_id",
    "user_id",
    "name",
    "profile_image",
    "status",
    "createdAt",
    "updatedAt",
  ]);
  return customerJson;
};

const Customer = mongoose.model("customer", customerSchema);
exports.Customer = Customer;
