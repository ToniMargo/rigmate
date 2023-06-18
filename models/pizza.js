module.exports = (mongoose) => {
  const PizzaSchema = mongoose.Schema(
    {
      pizza_name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true,
        unique: true
      },
      toppings: {
        type: [String],
        required: [true, 'At least one topping is required.'],
        validate: {
          validator: function (arr) {
            return arr.length >= 1;
          },
          message: 'At least one topping is required.'
        }
      },
      price: {
        type: Number,
        required: true
      }
    },
    { versionKey: false }
  );

  return mongoose.model('Pizza', PizzaSchema);
};
