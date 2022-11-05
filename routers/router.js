const r = require('koa-router')();
const register = require("./register");
const { login, keepLogin } = require("./login/login");
const logout = require("./login/logout");
const avoidLogin = require("./avoid-login");
const updateUser = require("./personal/update-user");
const updatePassword = require("./personal/update-password");
const { updateAvatar, fileOpt } = require("./personal/update-avatar");
const { talkAbout, root } = require("./talkAbout/talkAbout");
const toHostLike = require("./talkAbout/to-host-like");
const toChildLike = require("./talkAbout/to-child-like");
const reply = require("./talkAbout/reply");
const getTalk = require("./talkAbout/getTalk");
const isAdmin = require("./admin/is-admin");
const addLink = require("./admin/add-link");
const updateLink = require("./admin/update-link");
const deleteLink = require("./admin/delete-link");
const getLinks = require("./admin/get-links");
const { uploadMd, fileOpt } = require("./admin/upload-md");
// const { uploadCover, coverbody } = require("./admin/uploadCover");
// const addArticle = require("./admin/addArticle");
// const getArticle = require("./admin/getArticle");
// const getAllArticle = require("./admin/getAllArticle");
// const updateArticle = require("./admin/updateArticle");
// const deleteArticle = require("./admin/deleteArticle");
// const feedback = require("./feedback/feedback");
// const getFeedback = require("./feedback/getFeedback");
// const updateFeedback = require("./feedback/updateFeedback");
// const getVisitor = require("./Visitor/getVisitor");


r.post('/register', register);                //注册
r.post('/login', keepLogin, login);           //登录
r.post('/logout', logout);                    //退出登录
r.post('/avoidLogin', avoidLogin);            //通过cookie免登录

r.post('/updateUser', updateUser);            //修改账号
r.post('/updatePassword', updatePassword);    //修改密码
r.post('/updateAvatar', fileOpt, updateAvatar);//更换头像

r.post('/talkAbout', root, talkAbout);        //储存评论留言
r.post('/toHostLike', toHostLike);            //储存给ho
r.post('/toChildLike', toChildLike);          //储存子点赞
r.post('/reply', reply);                      //储存子评论
r.get('/getTalk', getTalk);                   //GET！留言信息响应给前端


r.post('/isAdmin', isAdmin);                  //判断是否是管理员
r.post('/addLink', addLink);                  //添加的友链表单信息
r.post('/updateLink', updateLink);            //修改友链数据
r.post('/deleteLink', deleteLink);            //删除友链数据
r.get('/getLinks', getLinks);                 //GET！友链数据响应给前端

r.post('/uploadMd', fileOpt, uploadMd);      //发表文章之md文档上传
// r.post('/cover', coverbody, uploadCover);      //发表文章之封面上传
// r.post('/addArticle', addArticle);             //文章数据存到数据库
// r.post('/updateArticle', updateArticle);       //修改文章数据
// r.delete('/deleteArticle/:id', deleteArticle); //删除文章数据

// r.post('/feedback', feedback);                 //用户反馈信息存到数据库
// r.post('/updateFeedback', updateFeedback);     //是否阅读反馈

// r.get('/getArticle', getArticle);        //GET！指定文章详情响应给前端
// r.get('/getAllArticle', getAllArticle);  //GET！全部文章信息响应给前端
// r.get('/getFeedback', getFeedback);      //GET！反馈信息响应给前端
// r.get('/getVisitor', getVisitor);        //GET！最近访客响应给前端

module.exports = r;