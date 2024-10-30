import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      default: "normal",
      enum: ["normal", "admin"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
