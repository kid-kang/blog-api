const { resolve } = require('path');
const multer = require('@koa/multer');

let last_path = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, "../../public/cover"));
  },
  filename: function (req, file, cb) {
    const ext = (file.originalname).split('.').pop();
    let lastpath = new Date().getTime() + '.' + ext;
    last_path = '/' + lastpath;
    cb(null, lastpath);
  }
});
const uploadCoverOpt = multer({ storage });

const uploadCover = ctx => {
  ctx.body = {
    code: 200,
    coverUrl: `/cover${last_path}`
  };
};
module.exports = { uploadCover, uploadCoverOpt };