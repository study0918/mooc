const express = require('express')

const app = express()
//引入跨域模块
app.use(require('cors')())
// 使用res.body时必须引入
app.use(express.json())
//引入数据库
require('./plugins/db')(app)
// require('./routes/admin')引用过来是一个函数，因此还需要加括号让它执行
require('./routes/admin')(app)
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})