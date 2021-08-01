import express from "express";
import {
  newUserValidation,
} from "../middlewares/fromValidation.js";

import { sendMessage } from "../modal/contact/Contact.modal.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const {name, phone, email, text} = req.body

    const newMessage = {
      name, phone, email, text
    }

console.log("got hit", newMessage)
    
    const result = await sendMessage(newMessage);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "Message sent successfully",
        result
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "error",
      message: "Unable to send message"
    });
  }
});

export default router;