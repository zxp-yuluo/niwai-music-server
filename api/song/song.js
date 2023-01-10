const router = require('koa-router')();
const nwQuery = require('../../db/database');
const dayjs = require('dayjs');

router.prefix('/songs');

// 添加歌曲
router.post('/',async ctx => {
  const {song_name,author_name,lyrics,image,album_name,url} = ctx.request.body
  const sql = ""
  try {
    ctx.body = {
      status: 1,
      data: {
  
      },
      message: '添加成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '请求失败：' + error.message
    }
  }
})


module.exports = router