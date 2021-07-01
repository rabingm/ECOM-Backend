import express from "express";
import {
  loginValidation,
  newUserValidation,
} from "../middlewares/fromValidation.js";
import { userAuthorization } from "../middlewares/authoMiddleware.js";
import { createUser, loginUser, getUserById } from "../modal/user/User.modal.js";
import { hashPassword, comparePassword } from "../Helpers/bcrypt.js";
import { createaccessJWT, createrefreshJWT, verifyAccessJwt } from "../Helpers/jwthelper.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});


router.get("/:_id", userAuthorization, async(req, res)=>{
try {
  const {authorization} = req.headers;
  const {_id} = req.params
if(!_id){
  res.send({
    status:"error",
    message: "Invalid request", 
  })
}

const tokenInfo = await verifyAccessJwt(authorization)
console.log(tokenInfo)
const user = await getUserById(_id)

if(user) user.password = undefined;

user._id ?
res.send({
  status:"success",
  message: "Welcome to your profile",
  user
})
:
res.send({
  status:"error",
  message: "Invalid request",
})

} catch (error) {
  // throw new Error(error.message)

  res.send({
    status:"error",
    message: error.message,
  })
}

})

// router.post("/", (req, res))

export default router;
