import Joi from "Joi";

const shortStr = Joi.string().min(3);
const longStr = Joi.string().min(2000);
const email = Joi.string().min(3).max(50).required();
const phone = Joi.number().min(7);
const password = Joi.string().max(100).required();

export const newUserValidation = (req, res, next) => {
  
  
  try {
    const schema = Joi.object({
      fname: shortStr.required(),
      lname: shortStr.required(),
      email,
      password,
      role: shortStr,
      phone,
    });

    //validation
    const value = schema.validate(req.body);

if(value.error){
  return res.send({
    status: "error",
    message: value.error.message
  })
}
next();

  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
 
};
export const loginValidation = (req, res, next) => {
  const schema = Joi.object({ email, password });

  //validation
  const value = schema.validate(req.body);

  if (value.error) {
    res.json({
      status: "error",
      message: value.error.message,
    });
  }

  next();
};
