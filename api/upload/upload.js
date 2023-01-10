const path = require('path')
const fs = require('fs');
const router = require('koa-router')();
const nwQuery = require('../../db/database');

router.prefix('/upload');

// 上传文件
router.post('/', async ctx => {
  const { file } = ctx.request.files
  const fileType = ['image/jpeg', 'image/png']
  if (file) {
    if (!fileType.includes(file.mimetype)) {
      const filePathName = path.join(__dirname, '../../public/image/' + file.newFilename)
      fs.unlink(filePathName, (err) => {
        if (err) {
          return false;
        }
      })
      ctx.body = {
        status: 0,
        data: null,
        message: '不支持的文件格式！'
      }
      return
    }
    ctx.body = {
      status: 1,
      data: {
        name: file.newFilename,
        file,
        url: 'http://localhost:8888/image/' + file.newFilename
      },
      message: '上传成功！'
    }
  } else {
    ctx.body = {
      status: 0,
      data: null,
      message: '请求失败：' + error.message
    }
  }
})

// 根据文件名删除文件
router.delete('/picture/:name', async ctx => {
  const { name } = ctx.request.params
  const filePathName = path.join(__dirname, '../../public/image/' + name)
  const isExists = fs.existsSync(filePathName)
  if (isExists) {
    fs.unlink(filePathName, (err) => {
      console.log(ctx.request.params, err);
      if (err) {
        return false;
      }
    })
    ctx.body = {
      status: 1,
      data: {},
      message: '删除成功！'
    }
  }else {
    ctx.body = {
      status: 0,
      data: null,
      message: '文件不存在！'
    }
  }
})


module.exports = router