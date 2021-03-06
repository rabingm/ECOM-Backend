import { verifyAccessJwt } from "../Helpers/jwthelper.js";
import { getAccessJwtByToken } from "../modal/session/session.modal.js";
import { getUserById } from "../modal/user/User.modal.js";

const getUserSession = accessJWT => {
	return new Promise(async (resolve, reject) => {
		const sessionInfo = await getAccessJwtByToken(accessJWT);
		resolve(sessionInfo);
	});
};

export const userAuthorization = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const verifyToken = await verifyAccessJwt(authorization);

		if (!verifyToken?.email) {
			return res.status(403).json({
				status: "error",
				message: "Unauthorized",
			});
		}

		//check if token is exist in database
		const info = await getUserSession(authorization);


		if (info.userId) {
			req.body._id = info.userId;
			// check and make sure the role is admin
			//let's get the user form DB
			// const user = await getUserById(info.userId);
			// console.log(user);
			// if (user.role === "Admin") {
			// 	return next();
			// } 
            return next()
		}

		res.status(403).json({
			status: "error",
			message: "Unauthorized",
		});
	} catch (error) {
		console.log(error);
		res.status(403).json({
			status: "error",
			message: "Unauthorized",
		});
	}
};