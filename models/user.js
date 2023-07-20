// const { ObjectId } = require("mongodb");

module.exports = (mongoose) => {
  const moboSchema = mongoose.Schema(require('./mobo'), { versionKey: false });
  const cpuSchema = mongoose.Schema(require('./cpu'), { versionKey: false });
  const gpuSchema = mongoose.Schema(require('./gpu'), { versionKey: false });
  const ramSchema = mongoose.Schema(require('./ram'), { versionKey: false });

  const rigSchema = mongoose.Schema(
    {
      owner: {
        type: String,
        required: true
      },
      rig_name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      motherboard: {
        type: moboSchema
      },
      cpu: {
        type: cpuSchema
      },
      gpu: {
        type: gpuSchema
      },
      ram: {
        type: ramSchema
      },
      resolution: String
    },
    { versionKey: false }
  );

  const userSchema = mongoose.Schema(
    {
      username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        lowercase: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      rig: {
        type: rigSchema
      }
    },
    { versionKey: false }
  );
  const Mobo = mongoose.model('Mobo', moboSchema);
  const Cpu = mongoose.model('Cpu', cpuSchema);
  const Gpu = mongoose.model('Gpu', gpuSchema);
  const Ram = mongoose.model('Ram', ramSchema);
  const User = mongoose.model('User', userSchema);
  const Rig = mongoose.model('Rig', rigSchema);

  return { Mobo, Cpu, Gpu, Ram, User, Rig };
};
