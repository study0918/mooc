module.exports  = app =>{
    const express = require('express');
    //需要用到express的子路由时使用
    const router = express.Router({ mergeParams: true});
    router.post('/',async(req,res)=>{
        // 这里需要连接数据库了，所以要去外面的index引入数据库
        // 发回给客户端已经创建完成，此时的返回数据是什么
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send(model)
    })
    router.get('/',async(req,res)=>{
        // populate关联
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
          queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    router.get('/:id',async(req,res)=>{
        const items = await req.Model.findById(req.params.id)
        res.send(items)
    })
    app.use('/admin/api/rest/:resource',async(req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        // return res.send({modelName})
        // 给请求对象上面挂载一个属性Model是require进来的模型
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)

    // 引入multer
    const multer = require('multer')
    // 定义上传中间件,传递一个地址并执行它
    const upload = multer({
        dest: __dirname + '/../../uploads',
    })
    // single单个文件,file是formData的名称
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        // express本身无法获取上传文件的数据，因此需要一个中间件专门来处理上传数据 multer
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}