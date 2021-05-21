import { ClientUsers } from "./User.schema.js";

export const createUser = (userObj) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsers(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export const loginUser = (email) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsers.findOne({ email })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
