const r = require('koa-router')();
const register = require("./register");
// const { log, keepLog } = require("./login/log");
// const personal = require("./personal/personalname");
// const isCheck = require("./isCheck/isCheck");
// const logout = require("./login/logout");
// const pass = require("./personal/pass");
// const { photo, isbody } = require("./personal/photo");
// const { talkAbout, root } = require("./talkAbout/talkAbout");
// const getTalk = require("./talkAbout/getTalk");
// const likes = require("./talkAbout/likes");
// const reply = require("./talkAbout/reply");
// const childrenLikes = require("./talkAbout/childrenLikes");
// const isAdmin = require("./admin/isAdmin");
// const addLink = require("./admin/addLink");
// const updateLink = require("./admin/updateLink");
// const deleteLink = require("./admin/deleteLink");
// const getLinkData = require("./admin/getLinkData");
// const { uploadMd, mdbody } = require("./admin/uploadMd");
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


r.post('/register', register);                       //注册
// r.post('/log', keepLog, log);              //登录
// r.post('/isCheck', isCheck);               //通过cookie免登录
// r.post('/logout', logout);                 //退出登录

// r.post('/personalname', personal);         //修改网名
// r.post('/pass', pass);                     //修改密码
// r.post('/photo', isbody, photo);           //更换头像

// r.post('/talkAbout', root, talkAbout);     //储存评论留言
// r.post('/likes', likes);                   //储存父点赞人员
// r.post('/reply', reply);                   //储存子评论
// r.post('/childrenLikes', childrenLikes);   //储存子点赞

// r.post('/isAdmin', isAdmin);               //判断是否是管理员
// r.post('/addLink', addLink);               //添加的友链表单信息
// r.post('/updateLink', updateLink);         //修改友链数据
// r.post('/deleteLink', deleteLink);         //删除友链数据

// r.post('/md', mdbody, uploadMd);               //发表文章之md文档上传
// r.post('/cover', coverbody, uploadCover);      //发表文章之封面上传
// r.post('/addArticle', addArticle);             //文章数据存到数据库
// r.post('/updateArticle', updateArticle);       //修改文章数据
// r.delete('/deleteArticle/:id', deleteArticle); //删除文章数据

// r.post('/feedback', feedback);                 //用户反馈信息存到数据库
// r.post('/updateFeedback', updateFeedback);     //是否阅读反馈

// r.get('/getLinkData', getLinkData);      //GET！友链数据响应给前端
// r.get('/getTalk', getTalk);              //GET！留言信息响应给前端
// r.get('/getArticle', getArticle);        //GET！指定文章详情响应给前端
// r.get('/getAllArticle', getAllArticle);  //GET！全部文章信息响应给前端
// r.get('/getFeedback', getFeedback);      //GET！反馈信息响应给前端
// r.get('/getVisitor', getVisitor);        //GET！最近访客响应给前端

module.exports = r;