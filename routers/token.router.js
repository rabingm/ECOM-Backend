import express from "express";
const router = express.Router();
import { verifyRefressJwt, createaccessJWT } from "../Helpers/jwthelper.js";
import { getUserByEmailAndRefeshJWT } from "../modal/user/User.modal.js";

router.all("*", (req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      // Process: call the function to get the accessjwt

      // 1. verify storeRefreshJWT
      const { email } = await verifyRefressJwt(authorization);

      // 3. find out the user who the code belongs to
      if (email) {
        // 2. check if it is in the database
        const user = await getUserByEmailAndRefeshJWT({
          email,
          refreshJWT: authorization,
        });
        console.log(user._id);
        if (user._id) {
            console.log("clg");
        
          const tokenExp = user.refreshJWT.addedAT;
          console.log(user.refreshJWT.addedAT);
          tokenExp.setDate(
            tokenExp.getDate() + +process.env.JWT_REFRESHKEY_EXP_DAY
          );
          const today = Date.now();
          // check if token is still valid
          if (tokenExp > today) {
            // 4. cretae new accessJWT and store in the seesion table in BD
            const accessJwt = await createaccessJWT(email, user._id);
            return res.json({
              status: "success",
              message: "Here is your new accessJWT",
              accessJwt,
            });

            // 3. find out the user who the code belongs to
          }
        }
      }
    }

    res.status(403).json({
      status: "error",
      message: "Unauthorized!",
    });
  } catch (error) {
    res.status(403).json({
      status: "error",
      message: "Unauthorized!",
    });
  }
});

export default router;
