const  userController =  require("./controllers/userController")
const fileController = require("./controllers/fileController")
const medicineController = require("./controllers/medicineController")
const multer = require('multer')

const DIR = './uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,fileName)
    }
});
var upload = multer({
    
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype === 'application/pdf') 
        {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


module.exports = function (app,req) {
    app.post("/user/create", userController.register);
    app.post("/user/login",userController.login);
    app.post("/file/upload", upload.single('file'), fileController.upload);
    app.post("/file/getAllByUser",fileController.getAllFilesByUser);
    app.post("/medicine/createGroup",medicineController.createGroup);
    app.post("/medicine/getAllGroupData",medicineController.getAllGroup);
    app.post("/medicine/saveMedicine",medicineController.saveMedicineController);
    app.post("/medicine/getAllMedicine",medicineController.getAllMedicineByUserController);
    // app.put("/user/edit/:email", userController.updateUsers);
    // app.delete("/user/delete", userController.deleteUser);
    // app.post("/products/post",productController.post);
    // app.get("/products/getAll",productController.getAll);
    // app.get("/products/getProduct/:id",productController.getProductById);
    // app.get("/image/getAll",fileController.getImages);
    // app.post("/image/upload",upload.single('image'),fileController.uploadImage);
    // app.get("/products/getProductByUser/:id",productController.getProductByUser);
    // app.post("/payement/makePayement",payementController.createSession);
    // app.get("/products/deleteProduct/:id",productController.deleteProdById);
    // app.post("/products/updateProd",productController.updateProductById);
  };
  