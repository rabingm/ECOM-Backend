import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: true,
    default: "",
  },
  lname: {
    type: String,
    require: true,
    default: "",
  },
  role: {
    type: String,
    require: true,
    default: "guest",
  },
  email: {
    type: String,
    unique: true,
    index:1,
    require: true,
    default: "",
  },
  phone: {
    type: Number,
    require: true,
    unique: true,
    index:1,
    default: "",
  },
  password: {
    type: String,
    require: true,
    default: "",
  },
});

export const ClientUsers = mongoose.model("ClientUsers", userSchema);
