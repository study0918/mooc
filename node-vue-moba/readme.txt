1.创建服务端mkdir server,初始化npm init -y
创建web端 vue create admin 选默认
安装vue/cli  npm i -g @vue/cli
全局安转nodemon npm i -g nodemon
安装elementUI  vue add element
启动服务 cd admin yarn serve
添加路由 vue add router

2.cd server
安装express cnpm i express@next mongoose cors

前后端服务需要同时启动
前端：cd admin yarn serve
后端：cd server yarn serve
mongoDB安装教程https://www.runoob.com/mongodb/mongodb-window-install.html

mongod --dbpath D:\data\db

连接不上mongoDB时可以参考这个：https://blog.csdn.net/qq_38111015/article/details/105955635

我的mongdb的安装目录为D:\Program Files\MongoDB\Server\4.4\bin
数据存储目录为D:\data

进入D:\Program Files\MongoDB\Server\4.4\bin执行mongod --dbpath D:\data\db

进入D:\Program Files\MongoDB\Server\4.4\bin执行mongo

