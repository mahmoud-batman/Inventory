const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
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

const User = mongoose.model("User", userSchema);
module.exports = User;
