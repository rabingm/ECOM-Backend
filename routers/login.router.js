import express from "express";
import { loginValidation, newUserValidation } from "../middlewares/fromValidation.js";

import { createUser, loginUser } from "../modal/user/user.modal.js";

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

router.put("/", newUserValidation, async (req, res) => {
  try {
    // createUser(user)
    const result = await createUser(req.body);

    if(result?._id) {
      return res.json({
        status:"success",
        message: "User account created successfully",
        result,
      });
    }
    res.json({
      status:"error", 
      message: "Invalid operation, please try again."
      
    });
  } catch (error) {
    console.log(error.message)
    if(error.message.includes("duplicate key error collection: ecommerce.clientusers index: _email")){
      return res.json({
        status:"error", 
        message: "Email already exits."
        
      });
    }
    if(error.message.includes("duplicate key error collection: ecommerce.clientusers index: _phone")){
      return res.json({
        status:"error", 
        message: "Phone number already exits."
        
      });
    }
  }
});
router.post("/",loginValidation, async (req, res) => {
  try {
    //loginUser(user)
    const result = await loginUser(req.body);

    if(result?._id) {
      return res.json({
        status:"success",
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
