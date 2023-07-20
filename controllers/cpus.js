const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const db = require('../models');

const Cpu = db.user.Cpu;

// ADMIN HAS ACCESS TO THIS:

const getAllCpus = async (req, res, next) => {
  try {
    const result = await Cpu.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleCpu = async (req, res, next) => {
  try {
    const cpuId = req.params.id;
    const doesExist = await Cpu.findById(cpuId);
    if (!doesExist) throw createError.NotFound('Cpu not found');

    const result = await Cpu.findById(cpuId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createCpu = async (req, res, next) => {
  try {
    const { manufacturer, model, core_amount, performance_boost_clock } = req.body;

    const cpu = new Cpu({ manufacturer, model, core_amount, performance_boost_clock });
    const savedCpu = await cpu.save();

    res.send(savedCpu);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const updateCpu = async (req, res, next) => {
  try {
    const cpuId = new ObjectId(req.params.id);
    const { manufacturer, model, core_amount, performance_boost_clock } = req.body;

    const doesExist = await Cpu.findById(cpuId);
    if (!doesExist) throw createError.NotFound('Cpu not found');

    const updatedCpu = await Cpu.findByIdAndUpdate(
      cpuId,
      { manufacturer, model, core_amount, performance_boost_clock },
      { new: true } // Return the updated document
    );

    res.send(updatedCpu);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const deleteCpu = async (req, res, next) => {
  try {
    const cpuId = new ObjectId(req.params.id);

    const doesExist = await Cpu.findById(cpuId);
    if (!doesExist) throw createError.NotFound('Cpu not found');

    await Cpu.findByIdAndDelete(cpuId);

    res.sendStatus(204); // No Content
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCpus,
  getSingleCpu,
  createCpu,
  updateCpu,
  deleteCpu
};
