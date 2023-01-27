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
// 角色API
const role = require('./api/role/role');
// 用户API
const users = require('./api/users/users');
// 歌手API
const singer = require('./api/singer/singer');
// 专辑API
const album = require('./api/album/album');


const server = new Koa()
const router = new KoaRouter()

server.use( async (ctx,next) => {
  const path = ctx.request.path.split('/')[1]
  const pathType = ['login','image','audio','lyrics']
  if(!pathType.includes(path)) {
    const {authorization} = ctx.request.headers
    // 请求是否带有token
    if(!authorization) ctx.throw(401)
    const boolean = verifyToken(authorization.replace('niwai_',''))
    // token过期
    if(!boolean) ctx.throw(401)
  }
  await next()
})

server.use(static(path.resolve(__dirname + '/public')));

server.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, './public'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      // console.log('传的是：', name);
      // const imageType = ['image/png', 'image/jpeg']
      // const audioType = ['audio/midi', 'audio/mpeg', 'audio/webm', 'audio/ogg', 'audio/wav']
      // 保持文件路径
      let dir
      // 获取文件后缀
      let ext = file.newFilename.split('.');
      ext = ext[ext.length - 1]
      switch (name) {
        case 'image':
          dir = path.join(__dirname, './public/image/')
          break;
        case 'audio':
          dir = path.join(__dirname, './public/audio/')
          break;
        case 'lyrics':
          dir = path.join(__dirname, './public/lyrics/')
          break;
      }
      const fileName = 'niwaiyinyue_' + uuidv4() + '.' + ext
      file.newFilename = fileName
      file.filepath = dir + fileName
    },
    onError: (error) => {
      console.log('上传出现错误：', error);
    }
  }
}));

// server.use(cors());

server.use(router.routes());
server.use(login.routes(), login.allowedMethods());
server.use(sheet.routes(), sheet.allowedMethods());
server.use(song.routes(), song.allowedMethods());
server.use(upload.routes(), upload.allowedMethods());
server.use(role.routes(), role.allowedMethods());
server.use(users.routes(), users.allowedMethods());
server.use(singer.routes(), singer.allowedMethods());
server.use(album.routes(), album.allowedMethods());
router.get('/', async ctx => {
  ctx.body = {
    title: "腻歪音乐-server",
    describe: "原生小程序、react练习项目API 。"
  }
});

server.listen(8888, () => {
  console.log('服务已启动http://139.196.78.237');
});
