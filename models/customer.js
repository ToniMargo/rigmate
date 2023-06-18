module.exports = (mongoose) => {
  const CustomerSchema = mongoose.Schema(
    {
      customer_name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    },
    { versionKey: false }
  );
  return mongoose.model('Customer', CustomerSchema);
};
