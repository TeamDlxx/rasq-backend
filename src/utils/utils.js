const send_email = async (resp_obj) => {
  require("dotenv").config();
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail
    .send(resp_obj)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  if (error.message) {
    res.status(400).json({
      message: error.message,
    });
  } else {
    res.status(400).send(error);
  }
};
// change order in delete case
const CHANGE_DEL_ORDER = async (_id, current_order, schema) => {
  let doc = await schema.find({
    _id: {
      $ne: _id,
    },
    order: {
      $gte: current_order,
    },
  });
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order - 1;
    await Obj.save();
  });
  await Promise.all(promise);
};

//ORDER_CHANGE_TO_LOWER
const ORDER_CHANGE_TO_LOWER = async (
  _id,
  current_order,
  past_order,
  schema
) => {
  let doc = await schema.find({
    _id: {
      $ne: _id,
    },
    order: {
      $gte: past_order,
      $lte: current_order,
    },
  });
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order + 1;
    await Obj.save();
  });
  await Promise.all(promise);
};

//_ORDER_CHANGE_TO_UPPER
const ORDER_CHANGE_TO_UPPER = async (
  _id,
  current_order,
  past_order,
  schema
) => {
  let doc = await schema.find({
    _id: {
      $ne: _id,
    },
    order: {
      $gte: current_order,
      $lte: past_order,
    },
  });
  console.log(doc, "this is doc");
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order - 1;
    await Obj.save();
  });
  await Promise.all(promise);
};

module.exports = {
  RENDER_BAD_REQUEST,
  CHANGE_DEL_ORDER,
  ORDER_CHANGE_TO_LOWER,
  ORDER_CHANGE_TO_UPPER,
  send_email,
};
