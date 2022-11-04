const body = require('koa-body')
const { resolve } = require('path')
let last_path = ''

let opt = {
    multipart: true,//支持多文件上传
    encoding: "gzip",//接收的文件形式gzip压缩形式 但接收的是没有压缩的
    formidable: {
    //   uploadDir: resolve(__dirname, "../../public/md"), // 设置接收的文件的存放地址，
      maxFileSize: 1024 * 1024 * 100,//文件大小
      // 保持默认文件后缀名
      keepExtensions: true,
      onFileBegin(name,file){
        let lastpath = "/" + 'md_' + new Date().getTime() + '.md'
        file.path = resolve(__dirname, "../../public/md") + lastpath
        last_path = lastpath
        // console.log(last_path);
    }
    }
}

let mdbody = body(opt)

const uploadMd = ctx => {
    ctx.body = {
        code:0,
        message:"md文件上传成功",
        mdUrl:`/md${last_path}`
    }
}
module.exports = {uploadMd,mdbody}