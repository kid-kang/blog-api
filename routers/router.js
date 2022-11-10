const r = require('koa-router')();
const register = require("./register");
const { login, keepLogin } = require("./login/login");
const logout = require("./login/logout");
const avoidLogin = require("./avoid-login");
const updateName = require("./personal/update-name");
const updatePassword = require("./personal/update-password");
const { updateAvatar, avatarFileOpt } = require("./personal/update-avatar");
const { addTalk, root } = require("./talk/add-talk");
const toHostLike = require("./talk/to-host-like");
const toChildLike = require("./talk/to-child-like");
const reply = require("./talk/reply");
const getTalk = require("./talk/getTalk");
const deleteTalk = require("./talk/delete-talk");
const { isAdmin, isAdminMiddleware } = require("./admin/is-admin");
const addLink = require("./link/add-link");
const updateLink = require("./link/update-link");
const deleteLink = require("./link/delete-link");
const getLinks = require("./link/get-links");
const { uploadMd, mdFileOpt } = require("./upload/upload-md");
const { uploadCover, coverFileOpt } = require("./upload/upload-cover");
const addArticle = require("./article/add-article");
const updateArticle = require("./article/update-article");
const deleteArticle = require("./article/delete-article");
const getSingleArticle = require("./article/get-single-article");
const getAllArticle = require("./article/get-all-article");
const addFeedback = require("./feedback/add-feedback");
const updateFeedback = require("./feedback/update-feedback");
const getFeedback = require("./feedback/get-feedback");
const getVisitor = require("./visitor");


r.post('/register', register);                //注册
r.post('/login', keepLogin, login);           //登录
r.post('/logout', logout);                    //退出登录
r.post('/avoidLogin', avoidLogin);            //通过cookie免登录

r.post('/updateName', updateName);                   //修改账号
r.post('/updatePassword', updatePassword);           //修改密码
r.post('/updateAvatar', avatarFileOpt, updateAvatar);//更换头像

r.post('/addTalk', root, addTalk);            //新增评论留言
r.post('/toHostLike', toHostLike);            //给host点赞
r.post('/toChildLike', toChildLike);          //给子评论点赞
r.post('/reply', reply);                      //回复评论
r.get('/getTalk', getTalk);                   //GET！留言信息响应给前端
r.get('/deleteTalk/:hostId', deleteTalk);     //DELETE! 删除host留言


r.post('/isAdmin', isAdmin);                                     //判断是否是管理员
r.post('/addLink', isAdminMiddleware, addLink);                  //添加的友链表单信息
r.post('/updateLink', isAdminMiddleware, updateLink);            //修改友链数据
r.delete('/deleteLink/:id', isAdminMiddleware, deleteLink);      //DELETE! 删除友链数据
r.get('/getLinks', getLinks);                                    //GET！友链数据响应给前端

r.post('/uploadMd', mdFileOpt, isAdminMiddleware, uploadMd);         //发表文章之md文档上传
r.post('/uploadCover', coverFileOpt, isAdminMiddleware, uploadCover);//发表文章之封面上传
r.post('/addArticle', isAdminMiddleware, addArticle);                //文章数据存到数据库
r.post('/updateArticle', isAdminMiddleware, updateArticle);          //修改文章数据
r.delete('/deleteArticle/:id', isAdminMiddleware, deleteArticle);    //DELETE! 删除文章数据
r.get('/getSingleArticle', getSingleArticle);                        //GET！指定文章详情响应给前端
r.get('/getAllArticle', getAllArticle);                              //GET！全部文章信息响应给前端

r.post('/addFeedback', addFeedback);                                 //用户反馈信息存到数据库
r.post('/updateFeedback', isAdminMiddleware, updateFeedback);        //是否阅读反馈
r.get('/getFeedback', isAdminMiddleware, getFeedback);               //GET！反馈信息响应给前端

r.get('/getVisitor', getVisitor);   //GET！最近访客响应给前端

module.exports = r;