import jsonwebtoken from "jsonwebtoken";
import { storeAccessJWT } from "../modal/session/session.modal.js";

export const createaccessJWT = (email, _id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //create token based on email
      var accesstoken = await jsonwebtoken.sign(
        { email },
        process.env.JWT_ACCESSKEY,
        { expiresIn: "15m" }
      );
      if (accesstoken) {
        const newSession = {
          accesstoken,
          userId: _id,
        };
        await storeAccessJWT(newSession);
      }
      resolve(accesstoken);
    } catch (error) {
      reject(error);
    }
  });
};

export const createrefreshJWT = (email, _id) => {
  return new Promise(async (resolve, reject) => {
    try {
      var refreshtoken = await jsonwebtoken.sign(
        { email },
        process.env.JWT_REFRESHKEY,
        { expiresIn: "30d" }
      );

      resolve(refreshtoken);
    } catch (error) {
      reject(error);
    }
  });
};
