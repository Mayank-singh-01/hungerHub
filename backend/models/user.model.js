const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "password is requires"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
