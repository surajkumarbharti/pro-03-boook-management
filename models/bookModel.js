const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    bookCover : {String},
    excerpt: {
      type: String,
      required: true,
      
    },
    userId: {
      type: ObjectId,
      required: true,
      refs: "userModel",
    },
    ISBN: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: {
      type: Number,
      default: 0,
      
      trim: true,
    },
    deletedAt: { Date },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    releasedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookModel", bookSchema);