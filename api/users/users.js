const router = require('koa-router')();

const nwQuery = require('../../db/database');

// router.prefix('/users');

// 获取所以用户
router.get('/users', async ctx => {
  ctx.body = {
    state: 1,
    data: '...',
    message: '查询成功！'
  }
})

module.exports = router