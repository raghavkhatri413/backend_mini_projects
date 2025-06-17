import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const storage=new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:'user_uploads',
        allowed_formats: ['jpg','png','jpeg'],
    },
});

const upload=multer({storage});
export default upload;