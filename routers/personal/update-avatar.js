const userTable = require("../../mongodb/user");
const { resolve } = require('path');
const multer = require('@koa/multer');
const fs = require("fs");

let last_path = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, "../../public/avatar"));
  },
  filename: function (req, file, cb) {
    const ext = (file.originalname).split('.').pop();
    let lastpath = new Date().getTime() + '.' + ext;
    last_path = '/' + lastpath;
    cb(null, lastpath);
  }
});
const uploadAvatarOpt = multer({ storage });

const updateAvatar = async ctx => {
  // //删除对应的文件
  const doc = await userTable.findById(ctx.session.userInfo._id);
  if (doc.avatar !== '/default.jpg') {
    const avatarPath = resolve(__dirname, "../../public/avatar") + doc.avatar;
    fs.unlink(avatarPath, err => {
      if (err) console.log('avatar文件:' + avatarPath + '删除失败！');
      else console.log('avatar文件:' + avatarPath + '删除成功！');
    });
  }

  await userTable.findByIdAndUpdate(ctx.session.userInfo._id, { avatar: last_path });
  ctx.session.userInfo.avatar = '/avatar' + last_path;

  ctx.body = {
    code: 200,
    message: "头像修改成功",
    data: ctx.session.userInfo
  };
};

module.exports = { updateAvatar, uploadAvatarOpt };