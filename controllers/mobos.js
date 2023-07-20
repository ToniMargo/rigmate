const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const db = require('../models');

const Mobo = db.user.Mobo;

// ADMIN HAS ACCESS TO THIS:

const getAllMobos = async (req, res, next) => {
  try {
    const result = await Mobo.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleMobo = async (req, res, next) => {
  try {
    const moboId = req.params.id;
    const doesExist = await Mobo.findById(moboId);
    if (!doesExist) throw createError.NotFound('Mobo not found');

    const result = await Mobo.findById(moboId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createMobo = async (req, res, next) => {
  try {
    const { manufacturer, model, socket, size_factor } = req.body;

    const mobo = new Mobo({ manufacturer, model, socket, size_factor });
    const savedMobo = await mobo.save();

    res.send(savedMobo);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const updateMobo = async (req, res, next) => {
  try {
    const moboId = new ObjectId(req.params.id);
    const { manufacturer, model, socket, size_factor } = req.body;

    const doesExist = await Mobo.findById(moboId);
    if (!doesExist) throw createError.NotFound('Mobo not found');

    const updatedMobo = await Mobo.findByIdAndUpdate(
      moboId,
      { manufacturer, model, socket, size_factor },
      { new: true } // Return the updated document
    );

    res.send(updatedMobo);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const deleteMobo = async (req, res, next) => {
  try {
    const moboId = new ObjectId(req.params.id);

    const doesExist = await Mobo.findById(moboId);
    if (!doesExist) throw createError.NotFound('Mobo not found');

    await Mobo.findByIdAndDelete(moboId);

    res.sendStatus(204); // No Content
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMobos,
  getSingleMobo,
  createMobo,
  updateMobo,
  deleteMobo
};
