const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const studentSchema = new Schema(
  {
    username: { type: Schema.Types.ObjectId, ref: "User" },
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
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    notes: {
      Matematicas: { type: Array },
      Lengua: { type: Array },
      Fisica: { type: Array },
      Quimica: { type: Array },
      Biologia: { type: Array },
      EdFisica: { type: Array },
      Ingles: { type: Array },
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

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
