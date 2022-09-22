const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    isOwner:{
      type:String,
      default:false
    },
    contact_num:{
      type:Number,
    },
    address:{
      type:String,
    },
    profilePicUrl: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    newMessagePopup: {
      type: Boolean,
      default: true,
    },
    unreadMessage: {
      type: Boolean,
      default: false,
    },
    unreadNotification: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
