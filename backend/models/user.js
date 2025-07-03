const mongoose = require("mongoose");
const { hashPass } = require("../util/pass.js");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await hashPass(this.password);
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
