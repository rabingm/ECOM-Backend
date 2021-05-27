import ProdSchema from "./Product.schema.js";

export const getProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.find();

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProductById = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findById(_id);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const getProductBySlug = (slug) => {

  console.log("from modal",slug)
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findOne({slug});

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getFeaturedProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.find({ featured: false });
      console.log(result);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
