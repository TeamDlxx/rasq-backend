const { find_customer_by_user_id } = require("../DAL/customer");
const _code_verification = async (user_id, code, resp) => {
  // find customer by user id
  const customer_founded = await find_customer_by_user_id(user_id);
  if (!customer_founded) {
    resp.error = true;
    resp.error_message = "Something get wrong please contact support";
    return resp;
  }
  if (
    customer_founded.verification_code == code &&
    customer_founded.is_send_code == true
  ) {
    customer_founded.code = "";
    customer_founded.is_send_code = false;
    customer_founded.is_verified_code = true;
    await customer_founded.save();
    return resp;
  } else {
    resp.error = true;
    resp.error_message = "Invalid verification code";
    return resp;
  }
};
const code_verification = async (user_id, code) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _code_verification(user_id, code, resp);
  return resp;
};

module.exports = {
  code_verification,
};
