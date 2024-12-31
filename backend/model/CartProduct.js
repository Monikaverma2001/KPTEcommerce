const mongoose=require('mongoose')
module.exports = mongoose.model('cartproduct',{
//key:{type:type,default:something}
   "userId":{type:String,default:''},
   "cartProduct":[
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
    "images": [
        {type:String,default:''},
    ]}
]
   
  
});