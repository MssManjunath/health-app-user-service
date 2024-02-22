var mongoose = require("mongoose");

module.exports = mongoose.model("File",{
    fileName:{type:String,required:true},
    key:{type:String,required:true},
    fileType:{type:String,required: true},
    eTag:{type:String, required:true},
    uploadDate:{type:String,required: true},
    user:{type:mongoose.SchemaTypes.ObjectId,ref:"User",required:true,unique:false}
});

