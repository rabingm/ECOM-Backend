import Odrschema from "./Order.schema.js";

export const addToOrder = (odrObj) => {
  return new Promise((resolve, reject) => {
    try {
      Odrschema(odrObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
