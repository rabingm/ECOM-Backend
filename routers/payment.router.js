import express from "express";
import {
  loginValidation,
  newUserValidation,
} from "../middlewares/fromValidation.js";

import { v4 as uuidv4 } from 'uuid';

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_PRIVATEKEY);

import { createUser, loginUser } from "../modal/user/User.modal.js";

import { hashPassword, comparePassword } from "../helpers/bcrypt.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", (req, res) => {
  const { token, product } = req.body;
  ////
  const idempotency_key = uuidv4()
  return stripe.customers
    .create({ email: token.email, source: token.id })
    .then(customer =>{
      stripe.charges.create({
        customer: customer.id,
        amount: product.total,
        currency:"aud",
        description:"New order payment",
        receipt_email:token.email
      })
    },{
      idempotency_key
    }).then(result =>{
      console.log(result)

      res.send({
        status:"success",
        message:"Payment is taken",
        result
      })
    })
    .catch((error) => {
      console.log(error);
      res.send({
        status: error,
        message: "Error, we're unable to take the payment to the moment",
      });
    });

  ////

  res.send({
    status: "success",
    message: "Payment received",
  });
  console.log("TYhis is payment");
});

export default router;
