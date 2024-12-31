const mongoose = require("mongoose");



const otp = new mongoose.Schema(
  {
   
    email: {
      type: String,
      required: true,
    },
   
    otp:{
      type:Number,
      default:null
    }
  },
  {
    timestamps: true,
  }
);

const otpModel=mongoose.model("otps",otp)

module.exports = otpModel
