const multer = require('@koa/multer');
const { resolve } = require('path');
let last_path = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, "../../public/md"));
  },
  filename: function (req, file, cb) {
    const ext = (file.originalname).split('.').pop();
    let lastpath = new Date().getTime() + '.' + ext;
    last_path = '/' + lastpath;
    cb(null, lastpath);
  }
});
const uploadMdOpt = multer({ storage });

const uploadMd = ctx => {
  ctx.body = {
    code: 200,
    mdUrl: `/md${last_path}`
  };
};
module.exports = { uploadMd, uploadMdOpt };