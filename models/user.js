// const { ObjectId } = require("mongodb");

module.exports = (mongoose) => {
  const rigSchema = mongoose.Schema(
    {
      _id: {
        type: mongoose.Types.ObjectId
      },
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
        manufacturer: {
          type: String,
          required: true
        },
        model: {
          type: String,
          required: true
        }
      },
      cpu: {
        manufacturer: {
          type: String,
          required: true
        },
        model: {
          type: String,
          required: true
        }
      },
      gpu: {
        manufacturer: {
          type: String,
          required: true
        },
        model: {
          type: String,
          required: true
        }
      },
      ram: {
        manufacturer: {
          type: String,
          required: true
        },
        capacity: {
          type: Number,
          required: true
        },
        speed: {
          type: String
        }
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
  const User = mongoose.model('User', userSchema);
  const Rig = mongoose.model('Rig', rigSchema);

  return { User, Rig };
};
