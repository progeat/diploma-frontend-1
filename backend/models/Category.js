const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
