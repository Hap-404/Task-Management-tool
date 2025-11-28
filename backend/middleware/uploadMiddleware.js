const multer = require("multer");

//configure multer storage

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "uploads/");
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`);    }
});

//file filter
const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"), false);
    }
};

//multer upload
const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = upload;
