const mongoose= require('mongoose')

const admin=new mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true}
})

const AdminModel=mongoose.model('kptadmin',admin);

module.exports=AdminModel