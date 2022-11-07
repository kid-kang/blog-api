const userTable = require("../../mongodb/user");
const { koaBody } = require('koa-body');
const { resolve } = require('path');
const fs = require("fs");

let last_path = '';
let downloadURL = resolve(__dirname, "../../public/avatar");

let opt = {
  multipart: true,
  encoding: "gzip",
  formidable: {
    maxFileSize: 1024 * 1024 * 5,
    keepExtensions: true,   // 保持默认文件后缀名
    onFileBegin(name, file) {
      let lastpath = "/" + new Date().getTime() + '.jpg';
      file.path = downloadURL + lastpath;

      last_path = lastpath;
    }
  }
};

const avatarFileOpt = koaBody(opt);

const updateAvatar = async ctx => {
  //删除对应的文件
  const doc = await userTable.findById(ctx.session.userInfo.id);
  const avatarPath = resolve(__dirname, "../../public/avatar") + doc.avatar;
  fs.unlink(avatarPath, err => {
    if (err) console.log('avatar文件:' + avatarPath + '删除失败！');
    console.log('avatar文件:' + avatarPath + '删除成功！');
  });

  await userTable.findByIdAndUpdate(ctx.session.userInfo.id, { avatar: last_path });
  ctx.session.userInfo.avatar = last_path;

  ctx.body = {
    code: 200,
    message: "头像修改成功",
    data: ctx.session.userInfo
  };
};

module.exports = { updateAvatar, avatarFileOpt };