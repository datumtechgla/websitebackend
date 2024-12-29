const mongoose = require("mongoose");

const MembersSchema = new mongoose.Schema(
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
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true, 
  }
);

const Members = mongoose.model("members", MembersSchema);

module.exports = Members;
