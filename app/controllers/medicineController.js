const {saveNewGroup,getGroupByUser,saveMedicine,getAllMedicineByUser} = require("../services/medicineService");
const createGroup = async (req,res) =>{
    saveNewGroup(req.body)
    .then(resposnce =>{
        console.log(resposnce)
        if(resposnce?.success){
            res.send({
                status:200,
                message:'Group Created Successfully',
                groupId:resposnce?.groupId,
                success:true
            })
        }
        else{
            res.send({
                status:200,
                message:'Group creation Failed',
                success:false
            })
        }
    })
}
const getAllGroup = async (req,res) =>{
    const userId = req.body?.userId;
    const response =  await getGroupByUser(userId)
    if(response?.success){
        if(response?.groupData.length > 0) {
            res.send({
                status:200,
                message:'Group Date retrived Successfully',
                groupData:response?.groupData,
                success:true
            })
        }
        }
        else{
            res.send({
                status:200,
                message:'Unable to fetch group Data',
                success:false
            })
        }
}
const saveMedicineController = async (req,res) =>{
    let body = {
        medicineName : req?.body?.medicineName,
        quantity : req?.body?.quantity,
        group : req?.body?.group,
        userId:req?.body?.userId
    }
    const resposnce = await saveMedicine(body);
    if(resposnce?.success){
        console.log(resposnce)
        res.send({
            status:200,
            message:'Medicine Saved successfully',
            data:resposnce?.medicineId
        })
    }
    else{
        res.send({
            status:200,
            message:"Failed to save Medicine"
        })
    }
}

const getAllMedicineByUserController = async (req,res) =>{
    const userId = req.body?.userId;
    const response =  await getAllMedicineByUser(userId)
    if(response?.success){
        if(response?.medicineData.length > 0) {
            res.send({
                status:200,
                message:'Medicine Date retrived Successfully',
                medicineData:response?.medicineData,
                success:true
            })
        }
        }
        else{
            res.send({
                status:200,
                message:'Unable to fetch medicine Data',
                success:false
            })
        }
}

module.exports = {  
    createGroup,
    getAllGroup,
    saveMedicineController,
    getAllMedicineByUserController
}