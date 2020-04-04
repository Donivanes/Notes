const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    username: { type: Schema.ObjectId, ref: "User" },
    subject: {
      type: String,
      enum: [
        "Matematicas",
        "Lengua",
        "Fisica",
        "Quimica",
        "Biologia",
        "EdFisica",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

Teacher.collection.createIndexes([
  {
    key: { username: 1 },
    name: "username",
  },
]);

module.exports = Teacher;
