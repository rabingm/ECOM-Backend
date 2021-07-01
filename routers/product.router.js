import express from "express";
import sugify from "slugify";

const router = express.Router();

import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getProductBySlug,
} from "../modal/product/Product.model.js";

router.post("/feature", async (req, res) => {
  try {
    const result = await getFeaturedProducts();

    res.json({
      status: "Success",
      message: "Product fetching success",
      result: result.length ? result[0] : [],
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Success",
      message: error.message,
    });
  }
});

  router.get("/:_id", async (req, res) => {
    try {

     
      const { _id } = req.params;
      const result = _id ? await getProductById(_id) : await getProducts();

      res.json({
        status: "Success",
        message: "Product id fetching success",
        result
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "Success",
        message: error.message,
      });
    }
  });

  router.get("/product/:slug", async (req, res) => {
    try {
      const { slug } = req.params;

      console.log(slug
        
        
        )
      const result = await getProductBySlug(slug)

      console.log("Fetching slug From product router", result);

      res.json({
        status: "Success",
        message: "Product Slug fetching success",
        result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "Success",
        message: error.message,
      });
    }
  });
  router.get("/products/viewmore", async (req, res) => {
    try {

    
     
      const result = await getProducts()

      console.log("Fetching viewmore From product router", result);

      res.json({
        status: "Success",
        message: "View More Products fetching success",
        result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "Success",
        message: error.message,
      });
    }
  });


export default router;
