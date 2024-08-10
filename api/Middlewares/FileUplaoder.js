import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dkcyuohau',
    api_key: '614852153793615',
    api_secret: 'dhlO1YnJnKABnldIn-WmSPj3A7E'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname.split('.')[0] + ""
    },
});

const cloudinaryFileUploader = multer({ storage: storage });

export { cloudinaryFileUploader };
