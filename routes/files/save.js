const router = require('express').Router();
const ResBody = require('../../models/ResBody');
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }
});

router.post('/', upload.array('img'), (req, res) => {
  // console.log('req files', req.files);
  res.status(200).send(new ResBody(true, req.files, 'success'));
});

module.exports = router;