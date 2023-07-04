const createError = require('http-errors');
const db = require('../models');
const Rig = db.user.Rig;
const ObjectId = require('mongodb').ObjectId;

// ADMIN HAS ACCESS TO THIS:

const getAllRigs = async (req, res, next) => {
  try {
    const result = await Rig.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleRig = async (req, res, next) => {
  try {
    const rigId = new ObjectId(req.params.id);

    const doesExist = await Rig.findById(rigId);
    if (!doesExist) throw createError.NotFound('Rig not found');

    const result = await Rig.findById(rigId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRigs,
  getSingleRig
};
