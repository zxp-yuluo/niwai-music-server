const router = require('koa-router')();

const nwQuery = require('../../db/database');

router.prefix('/test');

// 获取所以用户(测试)
router.get('/users', async ctx => {
  const sql = 'SELECT * FROM users'
  try {
    const result = await nwQuery(sql)
    ctx.body = {
      state: 1,
      data: result,
      message: '查询成功！'
    }
  } catch (error) {
    ctx.body = {
      state: 0,
      data: null,
      message: '请求失败：' + error.message
    }
  }
})

module.exports = router