import express from "express";
import slugify from "slugify";

const router = express.Router()

import { getCategories } from "../modal/category/Category.model.js";

router.all("*", (req, res, next)=>{
    next()
    console.log("GOT HIT")
})

router.get("/", async (req, res)=>{

    try {
        
const result = await getCategories()

res.json({
    status : "success",
    message : "Category fetching success",
    result,

})
console.log("RESULT",result)

    } catch (error) {
        console.log(error)
        throw new Error (error.message)
    }
})

export default router;