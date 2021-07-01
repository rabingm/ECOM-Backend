import express from "express";
import slugify from "slugify";

const router = express.Router();

import {
  getCategories,
  getCategoriesById,
} from "../modal/category/Category.model.js";

router.all("*", (req, res, next) => {
  next();
  console.log("GOT HIT IN CATEGORY");
});

router.get("/categories", async (req, res) => {
  try {
    const result = await getCategories();

    res.json({
      status: "success",
      message: "Category fetching success",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
router.get("/:_id", async (req, res) => {
  console.log("GOT HIT IN ROIUTER")
  const { _id } = req.params;

  console.log("FETCHING ID",_id);

  try {

    const { email, password } = req.body;

    const result = await getCategoriesById(_id);

    res.json({
      status: "success",
      message: "Category fetching success",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

export default router;
