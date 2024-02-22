const { PutObjectCommand, S3Client,GetObjectCommand,DeleteObjectCommand }  = require("@aws-sdk/client-s3");
const File = require('../models/file');


const client = new S3Client({region:process.env.S3_REGION});

const fs = require('fs');

const StreamFile = (file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(file?.path);
        stream.on('open', () => {
            resolve(stream);
        });

        stream.on('error', (error) => {
            console.log('Streaming file error', error);
            reject(error);
        });
    });
};

const uploadFile = async (fileStream,file,fileName) => {
    const command = new PutObjectCommand({
        Bucket:process.env.S3_BUCKET,
        Key: fileName,
        Body : fileStream
    });
    try {
      const response = await client.send(command);
      return response;
    } catch (err) {
      return {failed:true}
    }
};

const deleteFile = async(key) =>{
    const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
      });
      try {
        const response = await client.send(command);
        return response;
      } catch (err) {
        console.error(err);
        return {
            failed:true
        }
      }
}


async function downloadFile(file, downloadPath) {

    const downloadParams = {
        Bucket:process.env.S3_BUCKET,
        Key: file.originalname,
    };

    try {
        const data = await client.send(new GetObjectCommand(downloadParams));
        const fileStream = fs.createWriteStream(downloadPath);
        data.Body.pipe(fileStream);
        console.log('File downloaded:', fileKey);
    } catch (err) {
        console.error("Error", err);
    }
}

async function saveFileToDb(file){
    let fileData = new File({
        fileName:file.name,
        key:file.key,
        fileType:file.mimeType,
        eTag:file.eTag,
        user:file.userId,
        uploadDate : new Date()
    });
    try{
    const res = await fileData.save()
        if(res?._id){
           const result =  await getFilesByUser(file.userId)
            if(result){
                return {
                    success:true,
                    id:res?._id,
                    allFiles:result
                }
            }
        }
        else{
            return{
                success:false
            }
        }
    }
    catch(error){
        console.log(error);
        console.log("Reachedd here");
        return {
            success:false
        }
    }

}

async function getFilesByUser(userId){
    let files = await File.find({'user':userId});
    return files;
}

module.exports = {
    StreamFile,
    uploadFile,
    downloadFile,
    saveFileToDb,
    deleteFile,
    getFilesByUser
}
