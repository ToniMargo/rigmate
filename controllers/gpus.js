const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const db = require('../models');

const Gpu = db.user.Gpu;

// ADMIN HAS ACCESS TO THIS:

const getAllGpus = async (req, res, next) => {
  try {
    const result = await Gpu.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleGpu = async (req, res, next) => {
  try {
    const gpuId = req.params.id;
    const doesExist = await Gpu.findById(gpuId);
    if (!doesExist) throw createError.NotFound('Gpu not found');

    const result = await Gpu.findById(gpuId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createGpu = async (req, res, next) => {
  try {
    const { manufacturer, model, vram } = req.body;

    const gpu = new Gpu({ manufacturer, model, vram });
    const savedGpu = await gpu.save();

    res.send(savedGpu);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const updateGpu = async (req, res, next) => {
  try {
    const gpuId = new ObjectId(req.params.id);
    const { manufacturer, model, vram } = req.body;

    const doesExist = await Gpu.findById(gpuId);
    if (!doesExist) throw createError.NotFound('Gpu not found');

    const updatedGpu = await Gpu.findByIdAndUpdate(
      gpuId,
      { manufacturer, model, vram },
      { new: true } // Return the updated document
    );

    res.send(updatedGpu);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const deleteGpu = async (req, res, next) => {
  try {
    const gpuId = new ObjectId(req.params.id);

    const doesExist = await Gpu.findById(gpuId);
    if (!doesExist) throw createError.NotFound('Gpu not found');

    await Gpu.findByIdAndDelete(gpuId);

    res.sendStatus(204); // No Content
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGpus,
  getSingleGpu,
  createGpu,
  updateGpu,
  deleteGpu
};
