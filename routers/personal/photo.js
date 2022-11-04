const UserTable = require("../../table/usertable")
const body = require('koa-body')
const { resolve } = require('path')
let last_path = ''
let downloadURL = resolve(__dirname, "../../public/head_photo")

let opt = {
    multipart: true,
    encoding: "gzip",
    formidable: {
        // uploadDir: resolve(__dirname, "../public/head_photo"), // 设置接收的文件的存放地址，
        maxFileSize: 1024 * 1024 * 2,//文件大小
        // 保持默认文件后缀名
        keepExtensions: true,
        onFileBegin(name,file){
            let lastpath = "/" + new Date().getTime() + '.jpg'
            file.path = downloadURL + lastpath
            // file.name = "/" + new Date().getTime() + '.jpg'
            
            last_path = lastpath
            console.log(last_path);
        }
    }
}


let isbody = body(opt)

const photo = async ctx => {

    await UserTable.findByIdAndUpdate(ctx.session.userInfo._id, {head_photo: last_path}) //修改数据库的pohto路径
    
    ctx.session.userInfo.photo = last_path  //修改session的pohto路径
    
    ctx.body = {
        code: 0,
        message: "头像修改成功",
        data: ctx.session.userInfo
    }
}

module.exports = {photo,isbody}