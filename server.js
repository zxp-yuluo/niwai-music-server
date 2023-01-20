const Koa = require('koa');
const KoaRouter = require('koa-router');
// koa-body 帮助解析 http 中 body 的部分的中间件，包括 json、表单、文本、文件等。
const { koaBody } = require('koa-body');
// koa-static 是一个提供静态资源访问的中间件。
const static = require('koa-static');
// 解决前端跨域问题
// const cors = require('@koa/cors');
const path = require('path');
const users = require('./api/users/users');
const {verifyToken} = require('./token/token')


const server = new Koa()
const router = new KoaRouter()

// server.use( async (ctx,next) => {
//   console.log(ctx.request.headers.authorization);
//   const {authorization} = ctx.request.headers
//   // 请求是否带有token
//   if(!authorization) ctx.throw(401)
//   const boolean = verifyToken(authorization.replace('niwai_',''))
//   // token过期
//   if(!boolean) ctx.throw(401)
//   await next()
// })

server.use(static(path.resolve(__dirname + '/public')));

server.use(koaBody());

// server.use(cors());

server.use(router.routes());
server.use(users.routes(), users.allowedMethods());
router.get('/', async ctx => {
  ctx.body = {
    title: "腻歪音乐-server",
    describe: "原生小程序、react练习项目API 。"
  }
});

server.listen(8888, () => {
  console.log('服务已启动http://localhost:8888');
});
