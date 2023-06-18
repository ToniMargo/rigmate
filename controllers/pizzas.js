const createError = require('http-errors');
// const Pizza = require('../models/pizza');

const db = require('../models');
const Pizza = db.pizza;

const ObjectId = require('mongodb').ObjectId;

const getData = async (req, res, next) => {
  try {
    const result = await Pizza.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleData = async (req, res, next) => {
  try {
    const pizzaId = new ObjectId(req.params.id);

    const doesExist = await Pizza.findById(pizzaId);
    if (!doesExist) throw createError.NotFound('Pizza not found');

    const result = await Pizza.findById(pizzaId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createPizza = async (req, res, next) => {
  try {
    const { pizza_name, description, toppings, price } = req.body;

    const pizza = new Pizza({ pizza_name, description, toppings, price });
    const savedPizza = await pizza.save();

    res.send(savedPizza);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const updatePizza = async (req, res, next) => {
  try {
    const pizzaId = new ObjectId(req.params.id);
    const { pizza_name, description, toppings, price } = req.body;

    const doesExist = await Pizza.findById(pizzaId);
    if (!doesExist) throw createError.NotFound('Pizza not found');

    const updatedPizza = await Pizza.findByIdAndUpdate(
      pizzaId,
      { pizza_name, description, toppings, price },
      { new: true } // Return the updated document
    );

    res.send(updatedPizza);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const deletePizza = async (req, res, next) => {
  try {
    const pizzaId = new ObjectId(req.params.id);

    const doesExist = await Pizza.findById(pizzaId);
    if (!doesExist) throw createError.NotFound('Pizza not found');

    await Pizza.findByIdAndDelete(pizzaId);

    res.sendStatus(204); // No Content
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
  getSingleData,
  createPizza,
  updatePizza,
  deletePizza
};
