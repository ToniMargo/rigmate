const createError = require('http-errors');
const db = require('../models');
const User = db.user.User;
const Rig = db.user.Rig;

const ObjectId = require('mongodb').ObjectId;
const { userSchema } = require('../utils/validation');

const getAllUsers = async (req, res, next) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);

    const doesExist = await User.findById(userId);
    if (!doesExist) throw createError.NotFound('User not found');

    const result = await User.findById(userId);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    await userSchema.validateAsync(req.body);

    const usernameDoesExist = await User.findOne({ username: username });
    if (usernameDoesExist) throw createError.Conflict(`${username} is already taken!`);

    const passwordDoesExist = await User.findOne({ password: password });
    if (passwordDoesExist) throw createError.Conflict(`Password is already been taken!`);

    const emailDoesExist = await User.findOne({ email: email });
    if (emailDoesExist) throw createError.Conflict(`${email} is already registered`);

    const user = new User({ username, email, password });
    const savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const { username, email, password } = req.body;

    const doesExist = await User.findById(userId);
    if (!doesExist) throw createError.NotFound('user not found');

    await userSchema.validateAsync(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true } // Return the updated document
    );

    res.send(updatedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);

    const doesExist = await User.findById(userId);
    if (!doesExist) throw createError.NotFound('user not found');

    await User.findByIdAndDelete(userId);

    res.sendStatus(204); // No Content
  } catch (error) {
    next(error);
  }
};

const createRig = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('User not found.');
    }
    const _id = new ObjectId(req.params.id);
    const owner = user.username;
    console.log(owner);
    const { rig_name, description, motherboard, cpu, gpu, ram, resolution } = req.body;

    const newRig = new Rig({
      _id,
      owner,
      rig_name,
      description,
      motherboard,
      cpu,
      gpu,
      ram,
      resolution
    });
    console.log(newRig);

    user.rig = newRig;

    await user.save();
    await newRig.save();

    res.send(user);

    return user;
  } catch (error) {
    next(error);
    throw new Error('Failed to create user rig.');
  }
};

const updateRig = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('User not found.');
    }

    // Update the rig data
    Object.assign(user.rig, req.body);

    await Rig.findByIdAndUpdate(req.body.id, req.body, { new: true });

    // await rig.save();
    await user.save();

    res.send(user);

    return user;
  } catch (error) {
    next(error);
    throw new Error('Failed to update rig data.');
  }
};

const deleteRig = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('User not found.');
    }

    user.rig = undefined;
    await user.save();

    res.sendStatus(204); // No Content
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createRig,
  updateRig,
  deleteRig
};
