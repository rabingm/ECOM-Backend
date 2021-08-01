import ConSchema from "./Contact.schema.js";

export const sendMessage = (userObj) => {
  return new Promise((resolve, reject) => {
    try {
      ConSchema(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

