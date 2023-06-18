const createError = require('http-errors');
// const Customer = require('../models/customer');

const db = require('../models');
const Customer = db.customer;

const ObjectId = require('mongodb').ObjectId;
const { customerSchema } = require('../utils/validation');

const getData = async (req, res, next) => {
  try {
    const result = await Customer.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleData = async (req, res, next) => {
  try {
    const customerId = new ObjectId(req.params.id);

    const doesExist = await Customer.findById(customerId);
    if (!doesExist) throw createError.NotFound('Customer not found');

    const result = await Customer.findById(customerId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const { customer_name, email, password, address, phone } = req.body;
    await customerSchema.validateAsync(req.body);

    const doesExist = await Customer.findOne({ email: email });
    if (doesExist) throw createError.Conflict(`${email} is already been registered`);

    const customer = new Customer({ customer_name, email, password, address, phone });
    const savedCustomer = await customer.save();

    res.send(savedCustomer);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const customerId = new ObjectId(req.params.id);
    const { customer_name, email, password, address, phone } = req.body;

    const doesExist = await Customer.findById(customerId);
    if (!doesExist) throw createError.NotFound('Customer not found');

    await customerSchema.validateAsync(req.body);

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { customer_name, email, password, address, phone },
      { new: true } // Return the updated document
    );

    res.send(updatedCustomer);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const customerId = new ObjectId(req.params.id);

    const doesExist = await Customer.findById(customerId);
    if (!doesExist) throw createError.NotFound('Customer not found');

    await Customer.findByIdAndDelete(customerId);

    res.sendStatus(204); // No Content
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  getSingleData,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
