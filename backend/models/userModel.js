const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minLength: [5, "password must be more than 5 characters"],
      // maxLength: [10, "password must be less than 10 characters"],
    },
    photo: {
      type: String,
      required: true,
      default: "../imgs/image1.jpeg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // if password is not modified continue to the next middleware
  if (!this.isModified("password")) {
    return next();
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
