import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";

const PORT = process.env.PORT || 6000;

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
import router from "./routers/login.router.js";


//Use APIS
app.use("/api/v1/login", router);

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