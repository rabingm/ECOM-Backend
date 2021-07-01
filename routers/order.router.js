import express from "express";
import slugify from "slugify";
import { addToOrder } from "../modal/order/Order.Modal.js"
import { getUserById } from "../modal/user/User.modal.js";

const router = express.Router()

router.all("*", (req, res, next)=>{
    next()
    console.log("GOT HIT ON ORDER")
})

router.post("/",async (req, res)=>{
    try {

        const orderReq = req.body
        
        const getUser =await getUserById(orderReq.CustomerName._id);
        const getOrderQuantity = orderReq.order.Quantity;
        const getOrderItemName = orderReq.order.Item.name;
        const getOrderItemPrice = orderReq.order.Item.price;
        const totalPrice = getOrderItemPrice * getOrderQuantity;
        const orderUser = getUser.fname  + " " + getUser.lname 
        
        const finalObj = {
            Cutomer_Name: orderUser,
            Item_Name: getOrderItemName,
            Item_Price: getOrderItemPrice,
            Item_Quantity : getOrderQuantity,
            Total_Price: totalPrice
        }
        const result = await addToOrder(finalObj)
        
        console.log(finalObj)
        console.log("Customer Name: ",orderUser)
        console.log("Item Name: ",getOrderItemName)
        console.log("Item Price: ",getOrderItemPrice)
        console.log("Item Quantity: ",getOrderQuantity)
        console.log("Total price: ", getOrderItemPrice * getOrderQuantity )

        res.json({
            status : "success",
            message : "Orders saving success",
            result,
        
        })
    } catch (error) {
        console.log(error)
        throw new Error (error.message)
    }
})

export default router