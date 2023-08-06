const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  // googleId: {
  //   type: String,
  //   // unique: true,
  // },
  // googleEmail: {
  //   type: String,
  //   // unique: true,
  // },
  // googleDisplayName: {
  //   type: String,
  // },
  paid: {
    type: Boolean,
    default: false
  },
  supreme:{
    type:Boolean,
    default: false
  },
  isAdmin: {
    type:Boolean,
    default: false
  }
},{timestamps: true});

// userSchema.plugin(findOrCreate);

const User = mongoose.model("users", userSchema);

module.exports = User;
