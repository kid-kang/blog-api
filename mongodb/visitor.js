const { Schema, db } = require('./');

const visitorSchema = new Schema({
  visitor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user" //关联用户表
  },
  // 访问时间
  date: {
    type: Number,
    default: Date.now
  }
}, {
  versionKey: false // 去掉数据库中的 __v 属性
});

module.exports = db.model('visitor', visitorSchema);
