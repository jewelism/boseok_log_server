const router = require('express').Router();
// const ResBody = require('../../models/ResBody');
const multer = require('multer');
const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }
});

router.post('/save', upload.array('img'), (req, res) => {
  console.log('files', req.files);
});