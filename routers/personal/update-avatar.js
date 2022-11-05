const userTable = require("../../mongodb/user");
const { koaBody } = require('koa-body');
const { resolve } = require('path');
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

const fileOpt = koaBody(opt);

const updateAvatar = async ctx => {
  await userTable.findByIdAndUpdate(ctx.session.userInfo._id, { avatar: last_path });
  ctx.session.userInfo.avatar = last_path;

  ctx.body = {
    code: 200,
    message: "头像修改成功",
    data: ctx.session.userInfo
  };
};

module.exports = { updateAvatar, fileOpt };