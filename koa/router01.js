const Koa = require('koa');
const app = new Koa();
// 实现流工作
const fs = require('fs')

function render(page) {
  // 读写可能会假死，因此要异步处理
  return new Promise((resolve, reject) => {
    let pageUrl = `./page/${page}`;
    // 二进制读取
    fs.readFile(pageUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
async function route(url) {
  let page = '404.html';
  switch (url) {
    case '/':
      page = 'index.html';
      break;
    case '/index':
      page = 'index.html';
      break;
    case '/todo':
      page = 'todo.html';
      break;
    case '/404':
      page = '404.html';
      break;
    default:
      break;
  }
  let html = await render(page)
  return html
}
app.use(async (ctx) => {
  //获得地址栏的路径
  let url = ctx.request.url;
  let html = await route(url)
  ctx.body = html
})
app.listen(3000)