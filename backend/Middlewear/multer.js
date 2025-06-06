

//  Multer middleware in a Node.js app to handle file uploads

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename :(req,file,cb)=>{
        
        cb(null, `brand ${Date.now()}${path.extname(file.originalname)}`
    )
    }
})

// This function filters files based on MIME type (not just file extensions).
//Only allows PNG, JPG, and JPEG images.
const fileFilter =(req,file,cb)=>{
    const allowedTypes = ['image/png','image/jpeg','image/jpg ,image/avif']
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(new Error ('Invalid file type',false))
    }
}

const upload = multer({storage,fileFilter})
module.exports = upload;