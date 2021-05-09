module.exports  = app =>{
    const express = require('express');
    //需要用到express的子路由时使用
    const router = express.Router();
    const Category = require("../../models/Category")
    router.post('/categories',async(req,res)=>{
        console.log('req',req)
        // 这里需要连接数据库了，所以要去外面的index引入数据库
        // 发回给客户端已经创建完成，此时的返回数据是什么
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.put('/categories/:id',async(req,res)=>{
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/categories/:id',async(req,res)=>{
        const model = await Category.findByIdAndDelete(req.params.id,req.body)
        res.send(model)
    })
    router.get('/categories',async(req,res)=>{
        console.log('req',req)
        console.log('res',res)
        // populate关联
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })
    router.get('/categories/:id',async(req,res)=>{
        const items = await Category.findById(req.params.id)
        res.send(items)
    })
    app.use('/admin/api',router)
}