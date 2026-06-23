const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    created_at: {
      type: Date,
      required: true,
      index: true,
    },
    updated_at: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { versionKey: false }
);

// Fast browsing with filter + sort
productSchema.index({ category: 1, updated_at: -1, _id: -1 });
productSchema.index({ updated_at: -1, _id: -1 });

module.exports = mongoose.model("Product", productSchema);