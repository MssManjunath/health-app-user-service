var mongoose = require("mongoose");

module.exports = mongoose.model("Medicine",{
    medicineName:{type:String,required:true},
    quantity:{type:Number,required:true},
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:"User",required:true,unique:false},
    group:{type:[mongoose.SchemaTypes.ObjectId],ref:"Group",required:true,unique:false},
});

