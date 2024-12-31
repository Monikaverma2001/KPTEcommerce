const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    phone: {
      type: Number,
      default: 123456789,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    otp: {
      type: Number,
      default: null,
    },
    otpexp: {
      type: String,
      default: null,
    },
    verified: {
      type: String,
      default: null,
    },
    order:[
      { 
      "_id":{type:mongoose.Schema.Types.ObjectId,require:true},
      "title": {type:String,default:''},
      "description": {type:String,default:''},
      "price": {type:Number,default:0},
      "discountPercentage": {type:Number,default:0},
      "rating": {type:Number,default:0},
      "stock": {type:Number,default:0},
      "brand": {type:String,default:''},
      "category": {type:String,default:''},
      "thumbnail":{type:String,default:''},
      "status":{type:String,default:"order placed"},
      "quantity":{type:Number,default:1},
      "images": [
          {type:String,default:''},
      ]}
  ]
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", user);

module.exports = userModel;
