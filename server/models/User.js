const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;
const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: "Name is required",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [PASSWORD_PATTERN, "Invalid password pattern"],
    },
    isstudent: {
      type: String,
      default: true,
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

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt
    .genSalt(SALT_WORK_FACTOR)
    .then((salt) => {
      bcrypt.hash(user.password, salt).then((hash) => {
        user.password = hash;
        next();
      });
    })
    .catch((error) => next(error));
});

const User = mongoose.model("User", userSchema);

User.collection.createIndexes([
  {
    key: { username: 1 },
    name: "username",
  },
]);

module.exports = User;
