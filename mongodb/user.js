const { Schema, db } = require('./');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false //默认非管理员
  },
  avatar: {
    type: String,
    default: "/default.jpg"
  }
}, {
  versionKey: false // 去掉数据库中的 __v 属性
});

module.exports = db.model('user', userSchema);
