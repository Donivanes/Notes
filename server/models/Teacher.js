const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    username: { type: Schema.ObjectId, ref: "User" },
    firstname: String,
    lastname: String,
    subject: {
      type: String,
      enum: [
        "Matematicas",
        "Lengua",
        "Fisica",
        "Quimica",
        "Biologia",
        "EdFisica",
        "Ingles",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
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
