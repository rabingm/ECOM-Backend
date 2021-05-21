import express from "express";
import {
  loginValidation,
  newUserValidation,
} from "../middlewares/fromValidation.js";

import { createUser, loginUser } from "../modal/user/User.modal.js";

import { hashPassword, comparePassword } from "../pHelper/bcrypt.js";

const router = express.Router();


router.all("*", (req, res, next) => {
  next();
});

router.put("/", newUserValidation, async (req, res) => {
  try {
  

    const { password } = req.body;

    const hashPass = await hashPassword(password);

    console.log(hashPass);
    const newUser = {
      ...req.body,
      password: hashPass,
    };

    const result = await createUser(newUser);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "User account created successfully",
        result,
      });
    }
    res.json({
      status: "error",
      message: "Invalid operation, please try again.",
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
        message: "Email already exits.",
      });
    }
    if (
      error.message.includes(
        "duplicate key error collection: ecommerce.clientusers index: _phone"
      )
    ) {
      return res.json({
        status: "error",
        message: "Phone number already exits.",
      });
    }

    res.json({
      status: "error",
      message: "Unable to create the account",
    });
  }
});
router.post("/", loginValidation, async (req, res) => {
  try {
    //loginUser(user)
    const { email, password } = req.body;
    const result = await loginUser(email);

    console.log(req.body, result)
    if (!result?._id) {
      return res.json({
        status: "error",
        message: "Invalid login details",
      });
    }

    const dbHash = result.password;

    const user = await comparePassword(password, dbHash);

    if (!user) {
      return res.json({
        status: "error",
        message: "Invalid login",
      });
    }

   result.password = undefined

    res.json({
      status: "success",
      message: "login success",
      result,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

// router.post("/", (req, res))

// router.post("/", (req, res))

export default router;
