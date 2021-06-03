import SesSchema from "./session.schema.js";

export const storeAccessJWT =  (newAccessObj) => {
    return new Promise(async(resolve, reject)=>{
        try {
            const result = await SesSchema(newAccessObj).save();
            resolve(result);
          } catch (error) {
              reject(error)
            // console.log(error);
          }
    })
  
};
