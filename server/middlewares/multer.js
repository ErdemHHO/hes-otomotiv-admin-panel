// multerConfig.js
import multer from 'multer';
import fs from 'fs';

// Disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/files";
    if (!fs.existsSync(dir)) {
      // check if directory exists
      fs.mkdirSync(dir, { recursive: true }); // create directory if it does not exist
    }
    cb(null, "public/files"); // files will be saved in public/files directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // filename will be date_now_originalname
  },
});

// Filter configuration for only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

// Multer upload
const upload = multer({ storage, fileFilter });

export {
    upload
  };