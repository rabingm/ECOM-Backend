import express from "express";
import {
  
  newUserValidation,
} from "../middlewares/fromValidation.js";

import { createUser, loginUser } from "../modal/user/User.modal.js";

import { hashPassword, comparePassword } from "../helpers/bcrypt.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", newUserValidation, async (req, res) => {
  try {
console.log("got hit")
    const { password } = req.body;
    const hashPass = await hashPassword(password);
    console.log(hashPass);
    const newUser = {
      ...req.body,
      password: hashPass,
    };

    const result = await createUser(newUser);
    console.log("from signup", result)

    if (result?._id) {
      return res.json({
        status: "success",
        message: "User account created successfully",
        result
      });
    }
    res.json({
      status: "error",
      message: "Invalid operation, please try again."
    });
  } catch (error) {
    console.log(error.message);
    if (
      error.message.includes(
        "duplicate key error collection: ecommerce.clientusers index: _email"
      )
    ) {
      return res.json({
        status: "error",
        message: "Email already exits."
      });
    }
    if (
      error.message.includes(
        "duplicate key error collection: ecommerce.clientusers index: _phone"
      )
    ) {
      return res.json({
        status: "error",
        message: "Phone number already exits."
      });
    }

    res.json({
      status: "error",
      message: "Unable to create the account"
    });
  }
});

export default router;