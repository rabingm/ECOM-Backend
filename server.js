import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";

const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(morgan("tiny"));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//Database Connection
import mongoClient from "./db/db.js";
mongoClient()


//Load routers
import loginRouter from "./routers/login.router.js";
import signupRouter from "./routers/signUp.router.js";
import categoryRouter  from "./routers/category.router.js";
import productRouter from "./routers/product.router.js";
import userRouter  from "./routers/user.router.js";
import {userAuthorization}  from "./middlewares/authoMiddleware.js";
import paymentRouter  from "./routers/payment.router.js";
import tokenRouter from "./routers/token.router.js";
import orderRouter from "./routers/order.router.js";
import contactRouter from "./routers/contactus.router.js";


//Use APIS
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/user",userAuthorization, userRouter);
app.use("/api/v1/token", tokenRouter);
app.use("/api/v1/contactus", contactRouter);

app.use("/api/v1/signup", signupRouter);
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/checkout", orderRouter)


app.get("/", function (req, res) {
  res.send("hello world");
});

//404 Error handle
app.use((req, res, next)=>{
    const error = new Error("Resources not found")

    error.status = 404

    next(error)
})


//Error handle
import { handleError } from "./errorHandler/errorHandler.js";
app.use((error, req, res, next) =>{
    handleError(error, res)
})


app.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log(`Server is running at http://localhost:${PORT}`);
});