const { Customer } = require("../../src/models/customer");

const add_customer = async (data) => {
  const customer = new Customer(data);
  await customer.save();
};

const find_customer_by_user_id = async (id) => {
  return await Customer.findOne({ user_id: id });
};
module.exports = {
  add_customer,
  find_customer_by_user_id,
};
