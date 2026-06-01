const multer = require('multer');

//now we will make the middle which will help us to store the profile photo

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null , `${Date.now}-${file.originalname}`);
    }
})

const fileHandler = (req,file,cb)=>{
        const allowedTypes = ['image/jpg','image/jpeg','image/png'];
         if(allowedTypes.includes(file.mimetype)){
            cb(null , true); //sends true if the folder structure is correct
         }
        cb(new Error('only .jpeg .jpg .png is allowed to upload'),false);// else we will return false if our file doesn't support here        

}

//this will help us to store the profile photo
const upload = multer(storage , fileHandler);
module.exports = upload;