module.exports  = app =>{
    const express = require('express');
    //需要用到express的子路由时使用
    const router = express.Router();
    const Category = require("../../models/Category")
    router.post('/categories',async(req,res)=>{
        // 这里需要连接数据库了，所以要去外面的index引入数据库
        // 发回给客户端已经创建完成，此时的返回数据是什么
        const model = await Category.create(req.body)
        res.send(model)
    })
    app.use('/admin/api',router)
}