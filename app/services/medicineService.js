const Group = require('../models/group');
const Medicine  = require('../models/medicine');

const saveNewGroup = async (body) =>{
    const {groupName,timeArray,userId} = body
    let group = new Group({
        groupName : groupName,
        timings:timeArray,
        userId:userId
    })
    const queryRes = await group.save()
    .then(group =>{
        return {success:true,groupId:group}
    })
    .catch(error =>{
        return {success:false,error:error}
    })
    return queryRes;
}

const getGroupByUser = async (userId) =>{
    try {
        const data = await Group.find({'userId': userId});
        console.log(data);
        return { success: true, groupData: data };
    } catch (error) {
        return { success: false, error: error };
    }
}

const saveMedicine = async (body) =>{
    const medicine = new Medicine({
        medicineName:body?.medicineName,
        quantity:body?.quantity,
        group:body?.group,
        userId:body?.userId
    })
    const res = await medicine.save()
    .then(medicine =>{
        return {success:true,medicineId:medicine}
    })
    .catch(error =>{
        return {success:false,error:error}
    })
    return res;
}

const getAllMedicineByUser = async (userId) =>{
    try {
        const data = await Medicine.find({'userId': userId});
        console.log(data);
        return { success: true, medicineData: data };
    } catch (error) {
        return { success: false, error: error };
    }
}

module.exports = {
    saveNewGroup,
    getGroupByUser,
    saveMedicine,
    getAllMedicineByUser
}