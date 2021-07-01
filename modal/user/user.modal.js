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
export const getUserById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsers.findById(_id)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
export const getUserByEmailAndRefeshJWT = ({email, refreshJWT}) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsers.findOne({
        email,
        "refreshJWT.token": refreshJWT,
      })
      .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};


export const storeRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      ClientUsers.findOneAndUpdate(
        {
          _id,
        },
        {
          $set: { "refreshJWT.token": token, "refreshJWT.addedAT":Date.now() },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
