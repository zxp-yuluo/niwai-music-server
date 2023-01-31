const path = require('path')
const fs = require('fs');
const router = require('koa-router')();

router.prefix('/upload');

// 上传图片
router.post('/image', async ctx => {
  const { image } = ctx.request.files
  const fileType = ['image/jpeg', 'image/png']
  if (image) {
    if (!fileType.includes(image.mimetype)) {
      const filePathName = path.join(__dirname, '../../public/image/' + image.newFilename)
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
        name: image.newFilename,
        image: {},
        url: 'http://139.196.78.237/api/image/' + image.newFilename
        // url: 'http://localhost:5000/image/' + image.newFilename
      },
      message: '上传成功！'
    }
  } else {
    ctx.body = {
      status: 0,
      data: null,
      message: '上传失败！'
    }
  }
})

// 根据名字删除图片 
router.delete('/picture/:name', async ctx => {
  const { name } = ctx.request.params
  const filePathName = path.join(__dirname, '../../public/image/' + name)
  const isExists = fs.existsSync(filePathName)
  if (isExists) {
    fs.unlink(filePathName, (err) => {
      if (err) {
        return false;
      }
    })
    ctx.body = {
      status: 1,
      data: {},
      message: '删除成功！'
    }
  } else {
    ctx.body = {
      status: 0,
      data: null,
      message: '文件不存在！'
    }
  }
})
// 上传音频
router.post('/audio', async ctx => {
  const { audio } = ctx.request.files
  const fileType = ['audio/midi', 'audio/mpeg', 'audio/webm', 'audio/ogg', 'audio/wav']
  if (audio) {
    if (!fileType.includes(audio.mimetype)) {
      const filePathName = path.join(__dirname, '../../public/audio/' + audio.newFilename)
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
        name: audio.newFilename,
        audio: {},
        // url: 'http://139.196.78.237/api/audio/' + audio.newFilename
        url: 'http://localhost:5000/audio/' + audio.newFilename
      },
      message: '上传成功！'
    }
  } else {
    ctx.body = {
      status: 0,
      data: null,
      message: '上传失败！'
    }
  }
})
// 根据名字删除音频
router.delete('/audio/:name', async ctx => {
  const { name } = ctx.request.params
  const filePathName = path.join(__dirname, '../../public/audio/' + name)
  const isExists = fs.existsSync(filePathName)
  if (isExists) {
    fs.unlink(filePathName, (err) => {
      if (err) {
        return false;
      }
    })
    ctx.body = {
      status: 1,
      data: {},
      message: '删除成功！'
    }
  } else {
    ctx.body = {
      status: 0,
      data: null,
      message: '文件不存在！'
    }
  }
})
// 上传歌词
router.post('/lyrics', async ctx => {
  const { lyrics } = ctx.request.files
  if (lyrics) {
    ctx.body = {
      status: 1,
      data: {
        name: lyrics.newFilename,
        lyrics: {},
        // url: 'http://139.196.78.237/api/lyrics/' + lyrics.newFilename
        url: 'http://localhost:5000/lyrics/' + lyrics.newFilename
      },
      message: '上传成功！'
    }
  } else {
    ctx.body = {
      status: 0,
      data: null,
      message: '上传失败！'
    }
  }
})
// 根据名字删除歌词
router.delete('/lyrics/:name', async ctx => {
  const { name } = ctx.request.params
  const filePathName = path.join(__dirname, '../../public/lyrics/' + name)
  const isExists = fs.existsSync(filePathName)
  if (isExists) {
    fs.unlink(filePathName, (err) => {
      if (err) {
        return false;
      }
    })
    ctx.body = {
      status: 1,
      data: {},
      message: '删除成功！'
    }
  } else {
    ctx.body = {
      status: 0,
      data: null,
      message: '文件不存在！'
    }
  }
})
module.exports = router