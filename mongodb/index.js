const mongoose = require('mongoose')

let URL = 'mongodb://localhost:27017/blog'
//db是create方法返回的连接的数据库对象 可以控制多个数据库
const db = mongoose.createConnection(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//检测是否链接成功
db.on('open', () => {
  console.log('数据库连接成功:' + URL)
})

db.on('error', () => {
  console.log('数据库连接失败：' + URL)
})

module.exports = {
  db,
  Schema: mongoose.Schema //提取mongoose中的Schema属性
}
