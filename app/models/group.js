var mongoose = require("mongoose");

module.exports = mongoose.model("Group",{
    groupName:{type:String,required:true},
    timings:{type:[Date],required:true},
    userId:{type:mongoose.SchemaTypes.ObjectId,ref:"User",required:true,unique:false},
});

