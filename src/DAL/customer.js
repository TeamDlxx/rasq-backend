const { Customer } = require("../../src/models/customer");

const add_customer = async (data) => {
  const customer = new Customer(data);
  await customer.save();
};
module.exports = {
  add_customer,
};
