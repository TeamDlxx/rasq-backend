const { Document } = require("../models/documents");

const add_many_doc = async (document) => {
  const documents = await Document.insertMany(document);
  return documents;
};

const add_single_doc = async (document) => {
  let documents = new Document(document);
  documents = await documents.save();
  return documents;
};

const find_doc = async (id) => {
  let documents = await Document.findById(id);
  return documents;
};

const delete_many_doc = async (service_id) => {
  const documents = await Document.deleteMany({ service_id: service_id });
  return documents;
};
const get_many_doc = async (service_id) => {
  const documents = await Document.find({ service_id: service_id });
  return documents;
};

module.exports = {
  add_many_doc,
  delete_many_doc,
  get_many_doc,
  add_single_doc,
  find_doc,
};
