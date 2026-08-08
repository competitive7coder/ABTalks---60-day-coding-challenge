import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    about_me: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    refresh_token: {
      type: String,
      default: null,
    },
    longest_streak: {
      type: Number,
      default: 0,
    },
    current_streak: {
      type: Number,
      default: 0,
    },
    github: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;