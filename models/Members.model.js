const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    linkedinId: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    post: {
      type: String,
      required: false,
    },
    teamName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
