const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    Matematicas: [Number],
    Lengua: [Number],
    Fisica: [Number],
    Quimica: [Number],
    Biologia: [Number],
    EdFisica: [Number],
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);

Subject.collection.createIndexes([
  {
    key: { username: 1 },
    name: "username",
  },
]);

module.exports = Subject;
