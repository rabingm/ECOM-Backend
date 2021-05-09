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
  email: {
    type: String,
    require: true,
    default: "",
  },
  phone: {
    type: Number,
    require: true,
    default: "",
  },
  password: {
    type: Number,
    require: true,
    default: "",
  },
});

export const ClientUsers = mongoose.model("ClientUsers", userSchema);
