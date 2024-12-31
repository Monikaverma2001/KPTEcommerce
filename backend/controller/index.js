const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
app.use(cors());
app.use(express.json());
const Products = require("../model/index");
const cartProduct = require("../model/CartProduct");
const nodemailer = require("nodemailer");
const AdminModel = require("../model/AdminModel");
const crypto = require("crypto");

//require bcrypt to encrypt password
const bcrypt = require("bcrypt");

//require json web token to make user signed until logout
const jwt = require("jsonwebtoken");
const userModel = require("../model/Users");
const otpModel = require("../model/Otp");
const cookieParser = require("cookie-parser");

const uniqueId = require("uniqid");
const Razorpay = require("razorpay");

let instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    let userId = req.user._id;
    // console.log(userId)
    const user = await userModel.findById(userId);
    const cart = await cartProduct.findOne({ userId: userId });
    //console.log("cart ",cart)
    if (cart) {
      var option = {
        amount: 200,
        currency: "INR",
        receipt: req.user.email,
      };

      if (!option) res.status(404).json({ messege: "try again" });
      if (option) {
        try {
          const order_created = await instance.orders.create(option);

          res
            .status(200)
            .json({ messege: "cart is not empty", order: order_created });
        } catch (error) {
          res.status(404).json({ messege: "cart is empty" });
        }
      }
    } else {
      res.status(404).json({ messege: "cart is empty" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ messege: "auth error" });
  }
};

exports.verifyPayment = async (req, res) => {
  let userId = req.params.id;
  // console.log(userId)

  const user = await userModel.findById(userId);
  const cart = await cartProduct.findOne({ userId: userId });

  console.log("cart ", cart);
  if (cart) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
      console.log(req.body);

      let sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
      sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = sha.digest("hex");
      console.log("digest", digest);
      console.log("razorpaysignature", razorpay_signature);
      const order = await userModel.findByIdAndUpdate(
        //user order updated in the database also
        userId,
        { $push: {order: [...cart.cartProduct ] } }
      );
      console.log("order now ", order);
      await cartProduct.findOneAndDelete({ userId: userId });
      res.status(200).json({ messege: "order has been placed" });
    } catch (error) {
      console.log(error);
      res.status(404).json({ messege: "Internal server error" });
    }
  } else {
    console.log("hehe");
    res.status(404).json({ messege: "session logout" });
  }
};
exports.product = async (req, res) => {
  try {
    const d = await Products.find({});
    // console.log("my p ", d);

    res.json({ messege: "fetching", products: d });
  } catch (err) {
    // console.log("err : ", err);
  }
};

exports.adminUser = async (req, res) => {
  try {
    let data = req.body;

    console.log(data.email);
    let admin = await AdminModel.findOne({
      email: data.email,
      password: data.password,
    });
    console.log(admin);
    if (admin) {
      res.status(200).json({ messege: "successfully login", admin: admin });
    } else {
      res.status(404).json({ messege: "successfully login", admin: admin });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.deleteProduct = async (req, res) => {
  console.log("hello");
  try {
    let productid = req.params.id;
    console.log(productid);
    const deletedproduct = await Products.findByIdAndDelete(productid);

    res.status(200).json({ messege: "deleted successfully" });
  } catch (error) {
    res.json(404).json({ messege: "product not deleted" });
  }
};
exports.addToCartProduct = async (req, res) => {
  try {
    let userId = req.user._id;

    // console.log("userId ", userId);
    let newcart = req.body._id;
    newcart = Products.findById(newcart);

    let ifexist = await cartProduct.findOne({
      userId: userId,
    });
    if (!ifexist) {
      await cartProduct.create({
        userId: userId,
        cartProduct: [],
      });
    }
    let prevcard = await cartProduct.findOneAndUpdate(
      { userId: userId },
      { $push: { cartProduct: req.body } }
    );
    // console.log(prevcard);

    // const result=cartProduct.findOneAndUpdate({userId:userId},{
    //   cartProduct:[...prevcard.cartProduct,...newcart]
    // });
    // console.log(d);
    res.send("added to cart");
    //generate cart query
  } catch (err) {
    console.log(err);
  }
};

exports.getCartProducts = async (req, res) => {
  try {
    let user_id = req.user._id;
    const d = await cartProduct.find({ userId: user_id });
    // console.log("user",d);
    if (d) {
      // console.log(d);
      res.status(200).json({ product: d, messege: "your cart is ready" });
    } else {
      // console.log("no uset")
      res.status(404).json({ messege: "login first" });
    }
  } catch (err) {
    // console.log(err)
    res.json({ messege: "error occur" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const user_id = req.params.id;
    const product_id = req.body._id;
    let cart = await cartProduct.findOneAndUpdate(
      { userId: user_id },
      { $pull: { cartProduct: { _id: { $eq: product_id } } } }
    );
    let newcart = await cartProduct.findOne({ userId: user_id });
    res.status(200).json({ messege: "removed", product: newcart });
  } catch (error) {
    console.log("error exist");
    res.json({ messege: "error server" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token").json({ messege: "successfully logout" });
  } catch (error) {
    console.log(error);
  }
};
//users controller
exports.getuser = async (req, res) => {
  //write code to login the user
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      const passwordmatch = await bcrypt.compare(password, user.password);
      if (passwordmatch) {
        const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        /* res.cookie("token", token, { httpOnly: true, maxAge: 60000});*/
        // console.log("requested cookies ",req.cookie("token"))
        user.token = token;
        await user.save();

        return res
          .status(200)
          .cookie("token", token, {
            expires: new Date(Date.now() + 6000000),
          })
          .json({ messege: "Login success", user: user });
      } else {
        return res.status(401).json({ messege: "Invalid credencial" });
      }
    }
  } catch (err) {
    res.status(500).json({ messege: "server error" });
  }
};

exports.createotp = async (req, res) => {
  const { name, email, password, phone, otp } = req.body;
  try {
    const transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const user = await userModel.findOne({ email: email });
    const dbotp = await otpModel.findOne({ email: email });
    // const newotp = await otpModel.findOne({ email: email });
    if (user) {
      res.status(409).json({ messege: "user exist" });
    } else {
      str = "";
      for (i = 0; i < 4; i++) {
        randomIndex = Math.floor(Math.random() * 10);
        str = str + randomIndex;
      }
      str = parseInt(str);

      //genrate otp
      if (dbotp) {
        try {
          const gotp = await otpModel.findOneAndUpdate(
            {
              email: email,
            },
            { otp: str }
          );
          const info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "Your One-Time Password (OTP)", // Subject line
            text: `Dear User,
            
            Your One-Time Password for authentication is: ${str}  . Please use this code to complete your action. Note that this OTP is valid for a single use only and will expire shortly.
            
            Best regards,
            MONIKA`, // plain text body
          });
          // console.log(info);
          res.status(201).json({ messege: "OTP SENT" });
        } catch (error) {
          res.status(404).json({ messege: "TRY AGAIN" });
        }
      } else {
        try {
          const gotp = await otpModel.create({
            email: email,
            otp: str,
          });
          const info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "Your One-Time Password (OTP)", // Subject line
            text: `Dear User,
            
            Your One-Time Password for authentication is: ${str}  . Please use this code to complete your action. Note that this OTP is valid for a single use only and will expire shortly.
            
            Best regards,
            MONIKA`, // plain text body
          });
          // console.log(info);
          res.status(201).json({ messege: "OTP SENT" });
        } catch (error) {
          res.status(409).json({ messege: "TRY AGAIN" });
        }
      }
    }

    // res.status(201).json({ messege: "Successfully sign in" })
  } catch (err) {
    // console.log(err);
    res.status(400).json({ messege: "error occur" });
  }
};

exports.setuser = async (req, res) => {
  try {
    let { name, email, password, phone, otp } = req.body;

    otp = parseInt(otp);
    const otpRecord = await otpModel.findOne({ email: email });
    curotp = parseInt(otpRecord.otp);
    if (curotp === otp) {
      const hasspassword = await bcrypt.hash(password, 10);
      // OTP is valid
      const result = await userModel.create({
        name,
        email,
        password: hasspassword,
        phone,
      });
      const r = await cartProduct.create({
        userId: result._id,
        cartProduct: [],
      });
      // console.log(result);
      res.status(201).json({ messege: "Successfully sign in" });
    } else {
      // OTP is either not found or expired
      res.status(409).json({ messege: "OTP is not correct" });
    }
  } catch (error) {
    res.status(400).json({ messege: "error occur" });
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const single_product = await Products.findById(productId);
    // console.log(single_product);
    res.status(201).json({ product: single_product });
  } catch (error) {
    res.json({ messege: "something went wrong" });
  }
};

exports.allusers = async (req, res) => {
  try {
    const data = await userModel.find({});

    res.status(201).json({ user: data, messege: "users fetched" });
  } catch (error) {
    console.log(error);
  }
};
