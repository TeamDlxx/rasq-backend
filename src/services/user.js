const { checking_email_exist, signupUser } = require("../DAL/user");
const { signupAdmin } = require("../DAL/admin");
const { add_to_session } = require("../DAL/session");
const { send_email } = require("../utils/utils");
const { add_customer } = require("../DAL/customer");
const { v1: uuidv1 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _signup_user = async (body, resp) => {
  //cheking if user exist with current email
  const checkingemailexist = await checking_email_exist(body.email);
  if (checkingemailexist) {
    resp.error = true;
    resp.error_message = "Email already exist";
    return resp;
  }
  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(body.password, salt);
  const user_obj = {
    email: body.email,
    type: 1,
    password: password,
    status: true,
  };
  const user_data = await signupUser(user_obj);
  //add session
  //generating token'
  const access = "auth";
  const json_token = uuidv1();
  const token = jwt
    .sign({ login_token: json_token, access }, process.env.JWT_SECRET)
    .toString();
  const add_session = await add_to_session(json_token, user_data._id);
  const code = Math.floor(Math.random() * 1000000000);
  const email_obj = {
    to: body.email, // Change to your recipient
    from: "creativedesignweb786@gmail.com",
    subject: "Email verification",
    text: `your email verification code is ${code}`,
    //html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  await send_email(email_obj);
  const customer_obj = {
    verification_code: code,
    is_send_code: true,
    user_id: user_data._id,
  };
  console.log(customer_obj, "New customer ");
  const new_customer = await add_customer(customer_obj);
  return resp;
  const data_obj = {
    email: user.email,
    token: json_token,
  };
  resp.data = data_obj;
  return resp;
};

const signup_user = async (body) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _signup_user(body, resp);
  return resp;
};

module.exports = {
  signup_user,
};
