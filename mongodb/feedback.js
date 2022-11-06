const { Schema, db } = require('./');

const feedbackSchem = new Schema({ //友链信息表规则
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    default: Date.now
  },
  reading: { //管理员是否阅读过该条反馈  
    type: Boolean,
    default: false
  }
});

module.exports = db.model('feedback', feedbackSchem);