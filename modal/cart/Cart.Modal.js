import CartSchema  from "./Cart.schema.js";

export const getCart = () =>{
    return new Promise(async(resolve, reject) =>{
        try {
            const result = await CartSchema.find()
            resolve(result)
        } catch (error) {
            reject(error)
            
        }
    })
}