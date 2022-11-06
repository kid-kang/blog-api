const { Schema, db } = require('./');

const talkSchema = new Schema({
  content: { //留言
    type: String,
    required: true
  },
  date: { //留言时间
    type: Number,
    default: Date.now  //默认生成时间戳
  },
  likes: [  //点赞数, 存所有点赞了这条评论的用户的id
    { type: Schema.Types.ObjectId }
  ],
  author: { //当前发表这条评论的用户
    type: Schema.Types.ObjectId,
    ref: "user", //关联到用户信息表
    required: true
  },
  children: [ //回复留言（二级评论/子评论）
    {
      content: String,
      author: { type: Schema.Types.ObjectId, ref: "user" },  //写回复的用户id
      date: { type: Number, default: Date.now },
      likes: [{ type: Schema.Types.ObjectId }],
      toId: { type: Schema.Types.ObjectId, ref: "user" }  // 这条子回复是回复的谁的？
    }
  ]
}, {
  versionKey: false // 去掉数据库中的 __v 属性
});

module.exports = db.model('talk', talkSchema);