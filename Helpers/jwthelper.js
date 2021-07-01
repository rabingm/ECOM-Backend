import jsonwebtoken from "jsonwebtoken";
import { storeAccessJWT } from "../modal/session/session.modal.js";
import { storeRefreshJWT } from "../modal/user/User.modal.js";

export const createaccessJWT = (email, _id) => {
  return new Promise(async (resolve, reject) => {
    try {
      //create token based on email
      var accessJWT = await jsonwebtoken.sign(
        { email },
        process.env.JWT_ACCESSKEY,
        { expiresIn: "15m" }
      );
      if (accessJWT) {
        const newSession = {
          accessJWT,
          userId: _id,
        };

        console.log("from session modal", newSession)
        await storeAccessJWT(newSession);
      }
      resolve(accessJWT);
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

      storeRefreshJWT(_id, refreshtoken)

      resolve(refreshtoken);
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyAccessJwt = accessJWT => {
	try {
		const decoded = jsonwebtoken.verify(accessJWT, process.env.JWT_ACCESSKEY);

		return Promise.resolve(decoded);
	} catch (error) {
		console.log(error.message);
		return Promise.resolve(false);
	}
};
export const verifyRefressJwt = refreshJWT => {
	try {
		const decoded = jsonwebtoken.verify(refreshJWT, process.env.JWT_REFRESHKEY);

		return Promise.resolve(decoded);
	} catch (error) {
		return Promise.resolve(false);
	}
};