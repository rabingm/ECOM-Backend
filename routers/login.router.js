import express from "express";
import { loginValidation } from "../middlewares/fromValidation.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  next();
});

router.post("/", loginValidation, (req, res) => {
  console.log(req.body);
  res.json({
    message: "login requested",
  });
});

// router.post("/", (req, res))

// router.post("/", (req, res))

export default router;
