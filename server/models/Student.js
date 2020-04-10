const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    username: { type: Schema.ObjectId, ref: "User" },
    firstname: String,
    lastname: String,
    course: { type: Schema.ObjectId, ref: "Course" },
    notes: {
      Matematicas: { type: Array },
      Lengua: { type: Array },
      Fisica: { type: Array },
      Quimica: { type: Array },
      Biologia: { type: Array },
      EdFisica: { type: Array },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
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
