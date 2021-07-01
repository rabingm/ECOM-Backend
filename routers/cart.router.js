import express from "express";
import slugify from "slugify";
import { getCart } from "../modal/cart/Cart.Modal.js";

const router = express.Router()

router.all("*", (req, res, next)=>{
    next()
    console.log("GOT HIT")
})

router.get("/",async (req, res)=>{
    try {
        const result = await getCart()

        res.json({
            status : "success",
            message : "Cart fetching success",
            result,
        
        })
    } catch (error) {
        console.log(error)
        throw new Error (error.message)
    }
})

export default router