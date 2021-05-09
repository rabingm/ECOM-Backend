import express from "express";
import { loginValidation } from "../middlewares/fromValidation.js";

import { createUser, loginUser } from "../modal/user/category.modal.js";

const router = express.Router();

const user = {
  fname: "Rabin",
  lname: "Ghimire",
  email: "something@gmail.com",
  phone: "0426376826",
  password: "426376826",
};

router.all("*", (req, res, next) => {
  next();
});

router.post("/", loginValidation, async (req, res) => {
  try {
    // createUser(user)
    const result = await loginUser(req.body);

    if(result?._id) {
      return res.json({
        status:"error",
        message: "login success",
        result,
      });
    }
    res.json({
      status:"error",
      message: "Invalid login details"
      
    });
  } catch (error) {
    throw new error(error.message);
  }
});

// router.post("/", (req, res))

// router.post("/", (req, res))

export default router;
