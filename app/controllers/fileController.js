const {StreamFile,uploadFile,downloadFile,saveFileToDb,deleteFile,getFilesByUser}  = require("../services/FileServices.js");



const upload = async (req,res) =>{
const file = req.file;
const userId = req.body.userId;
const fileCategory = req.body.fileType;
var timestamp = Number(new Date()); // current time as number
var fileName = file.originalname;
var fileKey =  timestamp +'_'+userId +'_'+ file.originalname;
const fileStream = await StreamFile(file);
const ress = await uploadFile(fileStream,file,fileKey);

if(!ress.failed){
    let fileData = {
        name:fileName,
        key:fileKey,
        mimeType:fileCategory,
        eTag:ress.ETag,
        userId:userId
    }
saveFileToDb(fileData).then( async response =>{
    if(!response || !response.success){
        const fileDelete = await deleteFile(fileKey);
        if(!fileDelete.failed){
            res.send({
                status:200,
                success:false,
                message:"Saved to Aws but unable to save to DB , so deleted in Aws as well"
            })
        }
        else{
            res.send({
                status:200,
                success:false,
                message:"Saved to Aws but not in Db , and failed to Delete from Db which may lead to unessary Space usage"
            })
        }
    }
    else if(response.success){
        res.send({
            status:200,
            success:true,
            fileId : response.id,
            allFiles:response.allFiles,
            message:"Successfully Uploaded"
        })
    }
})
}
else{
    res.send({
        status:"200",
        success:false,
        message:"Failed to save File"
    })
}
}

const getAllFilesByUser = async (req,res) =>{
    const userId = req.body.userId;
    const response = await getFilesByUser(userId);
    res.send({
        status:200,
        message:"reached server",
        data:response
    })
}


module.exports = {
    upload,
    getAllFilesByUser
}
