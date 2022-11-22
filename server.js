const Koa = require('koa');
const KoaRouter = require('koa-router')

const server = new Koa()
const router = new KoaRouter()
server.use(router.routes())
router.get('/',async ctx => {
  ctx.body = {
    title: "腻歪音乐-server",
    describe: "原生小程序、react练习项目API 。"
  }
})

server.listen(8888,() => {
  console.log('服务已启动http://localhost:8888');
})