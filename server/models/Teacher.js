const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const teacherSchema = new Schema(
  {
    username: { type: Schema.ObjectId, ref: "User" },
    email: {
      type: String,
      trim: true,
      match: [EMAIL_PATTERN, "Please fill a valid email address"],
      sparse: true,
      unique: false,
      default: null,
      lowercase: true,
    },
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
