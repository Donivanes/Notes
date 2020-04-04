const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    Primero: { type: Schema.ObjectId, ref: "User" },
    Segundo: { type: Schema.ObjectId, ref: "User" },
    Tercero: { type: Schema.ObjectId, ref: "User" },
    Cuarto: { type: Schema.ObjectId, ref: "User" },
    Quinto: { type: Schema.ObjectId, ref: "User" },
    Sexto: { type: Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

Course.collection.createIndexes([
  {
    key: { username: 1 },
    name: "username",
  },
]);

module.exports = Course;
