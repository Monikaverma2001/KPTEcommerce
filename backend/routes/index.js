const express=require('express')
const router=express.Router();
const controller=require('../controller/index')

const authenticate=require('../Middleware/authenticate')

router.get('/products',controller.product)
router.post('/addtocart',authenticate,controller.addToCartProduct)
router.post('/getuser',controller.getuser)
router.post('/setuser',controller.setuser)
router.post('/createotp',controller.createotp)
router.get('/getProductById/:id',controller.getOneProduct)
router.get('/getCartProducts/',authenticate,controller.getCartProducts)
router.post('/removefromcart/:id',controller.removeFromCart)
router.post('/adminLogin/',controller.adminUser)
router.get("/logout",controller.logoutUser)
router.get("/allusers",controller.allusers)
router.get('/placeorder',authenticate,controller.createOrder)
router.post('/verify/:id',controller.verifyPayment)
router.post('/deleteproduct/:id',controller.deleteProduct)

module.exports= router;