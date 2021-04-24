const { Service } = require("../../src/models/service");

const get_order = async () => {
  const order = Service.findOne().sort({ _id: -1 }).select({ order: 1 });
  return order;
};

//creating service
const add_service = async (body) => {
  const orderObj = await get_order();
  if (orderObj) {
    order = orderObj.order + 1;
  } else {
    order = 1;
  }

  let service = new Service({
    parent_id: body.parent_id,
    title: body.title,
    status: body.status,
    icon: "",
    order: order,
  });

  service = await service.save();
  return service;
};

// Listing Services
const list_services = async () => {
  const services = await Service.find();
  return services;
};

// delete service

const deleteService = async (id) => {
  const service = await Service.findByIdAndDelete(id);
  return service;
};

// get single Service by id
const get_service = async (_id) => {
  const service = await Service.findOne({ _id: _id });
  return service;
};

module.exports = {
  add_service,
  list_services,
  get_service,
  deleteService,
};
