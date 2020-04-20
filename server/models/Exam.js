const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    course: String,
    subject: String,
    time: {
      type: Array,
      default: ["09:00", "10:00", "11:00", "12:00", "13:00"],
    },
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

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
