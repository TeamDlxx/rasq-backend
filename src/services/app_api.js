const axios = require("axios");
const { v1: uuidv1 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  add_to_session,
  get_session_by_user_id,
  delete_from_session,
} = require("../DAL/session");
const {
  find_user,
  find_user_by_id,
  find_user_by_email,
  signupUser,
} = require("../DAL/user");
const { add_customer } = require("../DAL/customer");
const { detailAdmin } = require("../DAL/admin");

const _google_login = async (body, resp) => {
  //======= Calling Gogle APi==========\\
  let name;
  let email;
  let picture;
  await axios({
    method: "GET",
    url:
      "https://oauth2.googleapis.com/tokeninfo?id_token=" + body.access_token,
    withCredentials: true,
  })
    .then(function (response) {
      // console.log(response.data);
      flag = true;
      name = response.data.given_name + " " + response.data.family_name;
      email = response.data.email;
      picture = response.data.picture;
      //console.log(email, "email ", name, "name");
    })
    .catch(function (response) {
      resp.error = true;
      resp.error_message = response.response.data;
      return resp;
    });
  //=====find user by email======\\
  const is_user = await find_user_by_email(email);
  if (!is_user) {
    //======addd user====\\
    const user_obj = {
      email: email,
      type: 1,
      status: true,
    };
    const new_user = await signupUser(user_obj);
    //generating token'
    const access = "auth";
    const json_token = uuidv1();
    const token = jwt
      .sign({ login_token: json_token, access }, process.env.JWT_SECRET)
      .toString();

    const add_session = await add_to_session(json_token, new_user._id);
    const data_obj = {
      token: token,
      email: email,
    };
    const customer_obj = {
      verification_code: "",
      is_send_code: false,
      user_id: new_user._id,
      is_verified_code: true,
    };
    const new_customer = await add_customer(customer_obj);
    resp.data = data_obj;
    return resp;
  } else {
    //======genearte access token and save to session=======\\
    //generating token'
    const access = "auth";
    const json_token = uuidv1();
    const token = jwt
      .sign({ login_token: json_token, access }, process.env.JWT_SECRET)
      .toString();
    const add_session = await add_to_session(json_token, is_user._id);

    const data_obj = {
      token: token,
      email: email,
    };
    resp.data = data_obj;
    return resp;
  }
};

const google_login = async (body) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _google_login(body, resp);
  return resp;
};

const _login_user = async (body, resp) => {
  const user = await find_user(body);
  if (!user) {
    resp.error = true;
    resp.error_message = "Invalid Email or Password";
    return resp;
  }
  if (user.type !== body.type) {
    resp.error = true;
    resp.error_message = "Something went wrong";
    return resp;
  }
  if (!user.password) {
    resp.error = true;
    resp.error_message = "Invalid user name or password";
    return resp;
  }
  const isValidPassword = await bcrypt.compare(body.password, user.password);

  if (!isValidPassword) {
    resp.error = true;
    resp.error_message = "Invalid Email or Password";
    return resp;
  }

  //generating token'
  const access = "auth";
  const json_token = uuidv1();
  const token = jwt
    .sign({ login_token: json_token, access }, process.env.JWT_SECRET)
    .toString();

  const add_session = await add_to_session(json_token, user._id);

  if (!add_session) {
    resp.error = true;
    resp.error_message = "Login Failed";
    return resp;
  }

  const admin = await detailAdmin(user._id);

  resp.data = {
    token: token,
    admin: admin,
  };

  return resp;
};

const login_user = async (body) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _login_user(body, resp);
  return resp;
};

const _change_password = async (body, user_id, resp) => {
  if (body.new_password !== body.confirm_password) {
    resp.error = true;
    resp.error_message = "Password And Confirm Password Not Matched";
    return resp;
  }

  let user = await find_user_by_id(user_id);
  if (!user) {
    resp.error = true;
    resp.error_message = "Something Wrong";
    return resp;
  }
  const isValidPassword = await bcrypt.compare(
    body.old_password,
    user.password
  );

  if (!isValidPassword) {
    resp.error = true;
    resp.error_message = "Old Password Is Incorrect";
    return resp;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(body.new_password, salt);
  user = await user.save();
  return resp;
};

const change_password = async (body, user_id) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _change_password(body, user_id, resp);
  return resp;
};

const _logout_user = async (user_id, resp) => {
  const session = await get_session_by_user_id(user_id);
  if (!session) {
    resp.error = true;
    resp.error_message = "Something Wrong";
    return resp;
  }
  const delete_session = await delete_from_session(session._id);
  if (!delete_session) {
    resp.error = true;
    resp.error_message = "Something Wrong";
    return resp;
  }
  return resp;
};

const logout_user = async (user_id) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _logout_user(user_id, resp);
  return resp;
};

module.exports = {
  login_user,
  change_password,
  logout_user,
  google_login,
};
