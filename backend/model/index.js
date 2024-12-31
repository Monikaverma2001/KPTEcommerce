const mongoose=require('mongoose')
module.exports = mongoose.model('products',{
//key:{type:type,default:something}
    "title": {type:String,default:''},
    "description": {type:String,default:''},
    "price": {type:Number,default:0},
    "discountPercentage": {type:Number,default:0},
    "rating": {type:Number,default:0},
    "stock": {type:Number,default:0},
    "brand": {type:String,default:''},
    "category": {type:String,default:''},
    "thumbnail":{type:String,default:''},
    "images": [
        {type:String,default:''},
    ]
  
});