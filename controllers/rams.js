const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const db = require('../models');

const Ram = db.user.Ram;

// ADMIN HAS ACCESS TO THIS:

const getAllRams = async (req, res, next) => {
  try {
    const result = await Ram.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleRam = async (req, res, next) => {
  try {
    const ramId = req.params.id;
    const doesExist = await Ram.findById(ramId);
    if (!doesExist) throw createError.NotFound('Ram not found');

    const result = await Ram.findById(ramId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createRam = async (req, res, next) => {
  try {
    const { manufacturer, model, capacity, speed } = req.body;

    const ram = new Ram({ manufacturer, model, capacity, speed });
    const savedRam = await ram.save();

    res.send(savedRam);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const updateRam = async (req, res, next) => {
  try {
    const ramId = new ObjectId(req.params.id);
    const { manufacturer, model, capacity, speed } = req.body;

    const doesExist = await Ram.findById(ramId);
    if (!doesExist) throw createError.NotFound('Ram not found');

    const updatedRam = await Ram.findByIdAndUpdate(
      ramId,
      { manufacturer, model, capacity, speed },
      { new: true } // Return the updated document
    );

    res.send(updatedRam);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const deleteRam = async (req, res, next) => {
  try {
    const ramId = new ObjectId(req.params.id);

    const doesExist = await Ram.findById(ramId);
    if (!doesExist) throw createError.NotFound('Ram not found');

    await Ram.findByIdAndDelete(ramId);

    res.sendStatus(204); // No Content
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRams,
  getSingleRam,
  createRam,
  updateRam,
  deleteRam
};
