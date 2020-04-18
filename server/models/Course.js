const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
      return ret;
    },
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
