import { ClientUsers } from "./user.schema.js";

export const createUser = (fObj) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsers(fObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export const loginUser = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsers.findOne({ email, password })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
