import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {

    Cutomer_Name:{
      type: String,
      default: "",

    },
    Item_Name:{
      type: String,
      default: "",

    },
    Item_Price:{
      type: Number,
      default: 0,

    },
    Item_Quantity:{
      type: Number,
      default: 0,

    },
    Total_Price:{
      type: Number,
      default: 0,

    },
    



    // status: {
    //   type: Boolean,
    //   require: true,
    //   default: false,
    // },
    // featured: {
    //   type: Boolean,
    //   require: true,
    //   default: false,
    // },
    // name: {
    //   type: String,
    //   require: true,
    //   default: "",
    // },
    // slug: {
    //   type: String,
    //   require: true,
    //   default: "",
    // },
    // price: {
    //   type: Number,
    //   require: true,
    //   default: 0,
    // },
    // salePrice: {
    //   type: Number,
    // },
    // saleEndDate: {
    //   type: Date,
    //   default: null,
    // },

    // qty: {
    //   type: Number,
    //   require: true,
    //   default: 0,
    // },
    // description: {
    //   type: String,
    //   require: true,
    //   default: "",
    // },
    // thumbNail: {
    //   type: String,
    // },
    // images: {
    //   type: Array,
    // },
    // categories: {
    //   type: Array,
    // },
  },
  {
    timestamp: true,
  }
);

const Odrschema = mongoose.model("Order", OrderSchema);

export default Odrschema;
