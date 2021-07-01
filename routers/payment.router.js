import express from "express";
import { v4 as uuidv4 } from 'uuid';
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51IwH65JgvGU90BXJ3vgIQ9fwA1kqd2TgjvdESjODzjJuBvp6pDBCtGZrNngcu5mIifaGauFIBQRRodVYbFMKGIij00AbIn5svY");


const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", (req, res) => {
  const { token, selectedProd, subTotal } = req.body;

  console.log("from product router", subTotal);

  ////
  const idempotencyKey = uuidv4()

  return stripe.customers
    .create({ email: token.email, source: token.id })
    .then(customer => {
      return stripe.charges.create({
        customer: customer.id,
        amount: subTotal*100, 
        // /selectedProd.total,
        currency: "aud",
        description: "New order payment",
        receipt_email: token.email
      })
    }, {
      idempotencyKey
    }).then(result => {
      res.send({
        status: "success",
        message: "Payment is taken",
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
});

export default router;
