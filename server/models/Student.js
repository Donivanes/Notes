const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    username: { type: Schema.ObjectId, ref: "User" },
    course: { type: Schema.ObjectId, ref: "Course" },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

Student.collection.createIndexes([
  {
    key: { username: 1 },
    name: "username",
  },
]);

module.exports = Student;
