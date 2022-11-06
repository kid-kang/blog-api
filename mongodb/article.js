const { Schema, db } = require('./');

const articleSchem = new Schema({
  title: { type: String, default: "暂无标题" },                        //标题
  describe: { type: String, default: "暂无描述" },                     //文章描述
  mdUrl: { type: String, required: true },                            //md文件地址
  coverUrl: { type: String, default: "/cover/default.jpg" },          //cover封面地址
  date: { type: Number, default: Date.now() },                        //发表时间
  readingNum: { type: Number, default: 0 },                           //阅读数
  author: { type: Schema.Types.ObjectId, ref: "user", required: true }//发表人（作者）
});

module.exports = db.model('article', articleSchem);