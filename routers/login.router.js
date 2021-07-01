import express from "express";
import {
  loginValidation,
  newUserValidation,
} from "../middlewares/fromValidation.js";

import { createUser, loginUser, getUserById } from "../modal/user/User.modal.js";
import { hashPassword, comparePassword } from "../Helpers/bcrypt.js";
import { createaccessJWT, createrefreshJWT, verifyAccessJwt } from "../Helpers/jwthelper.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", loginValidation, async (req, res) => {
  try {
    //loginUser(user)
    const { email, password } = req.body;
    const result = await loginUser(email);

    console.log(req.body, result);
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

    result.password = undefined;

    //  //create accessJWT
    const accessJWT = await createaccessJWT(result.email, result._id);

    //  //create refreshJWT
    const refreshJWT = await createrefreshJWT(result.email, result._id);

    res.json({
      status: "success",
      message: "login success",
      result,
      accessJWT,
      refreshJWT,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/:_id", async(req, res)=>{
try {
  const {_id} = req.params
if(!_id){
  res.send({
    status:"error",
    message: "Invalid request", 
  })
}
const user = await getUserById(_id)

if(user) user.password = undefined;

user._id ?
res.send({
  status:"success",
  message: "Login successful",
  user
})
:
res.send({
  status:"error",
  message: "Invalid request",
})

} catch (error) {
  throw new Error(error.message)
}

})

// router.post("/", (req, res))

export default router;
