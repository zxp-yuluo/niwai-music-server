const path = require('path')
const Koa = require('koa');
const KoaRouter = require('koa-router');
// koa-body 帮助解析 http 中 body 的部分的中间件，包括 json、表单、文本、文件等。
const { koaBody } = require('koa-body');
// koa-static 是一个提供静态资源访问的中间件。
const static = require('koa-static');
// 解决前端跨域问题
// const cors = require('@koa/cors');
const { v4: uuidv4 } = require('uuid');
const { verifyToken } = require('./token/token')


// 登录API
const login = require('./api/login/login')
// 歌单API
const sheet = require('./api/sheet/sheet')
// 歌曲API
const song = require('./api/song/song')
// 上传图片
const upload = require('./api/upload/upload');

const server = new Koa()
const router = new KoaRouter()

// server.use( async (ctx,next) => {
//   const {authorization} = ctx.request.headers
//   // 请求是否带有token
//   if(!authorization) ctx.throw(401)
//   const boolean = verifyToken(authorization.replace('niwai_',''))
//   // token过期
//   if(!boolean) ctx.throw(401)
//   await next()
// })

server.use(static(path.resolve(__dirname + '/public')));

server.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, './public/image'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      // 获取文件后缀
      let ext = file.newFilename.split('.');
      ext = ext[ext.length - 1]
      // 保持文件路径
      const uploadDir = path.join(__dirname, './public/image/')
      const fileName = 'niwaiyinyue_' + uuidv4() + '.' + ext
      file.newFilename = fileName
      file.filepath = uploadDir + fileName
    },
    onError: (error) => {
      console.log(error);
    }
  }
}));

// server.use(cors());

server.use(router.routes());
server.use(login.routes(), login.allowedMethods());
server.use(sheet.routes(), sheet.allowedMethods());
server.use(song.routes(), song.allowedMethods());
server.use(upload.routes(), upload.allowedMethods());



router.get('/', async ctx => {
  ctx.body = {
    title: "腻歪音乐-server",
    describe: "原生小程序、react练习项目API 。"
  }
});

server.listen(8888, () => {
  console.log('服务已启动http://localhost:8888');
});
