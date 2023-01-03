const router = require('koa-router')();

const nwQuery = require('../../db/database');

// router.prefix('/test');

// 获取所以用户(测试)
router.post('/login', async ctx => {
  const {username,password} = ctx.request.body
  // console.log(username,password);
  const sql = 'SELECT * FROM test WHERE username=?'
  try {
    const result = await nwQuery(sql,username)
    console.log("result:",result);
    // 判断是否有该用户名的数据
    if(!result.length) {
      ctx.body = {
        state: 0,
        data: null,
        message: '该用户不存在！'
      }
      return
    }
    const {username:resultUsername,password:resultPassword} = result[0]
    console.log('resultUsername:',resultUsername,'resultPassword:',resultPassword);
    // 判断密码是否正确
    if(password !== resultPassword) {
      ctx.body = {
        state: 0,
        data: null,
        message: '密码不正确！'
      }
      return
    }
    delete result[0].password
    ctx.body = {
      state: 1,
      data: result,
      message: '登录成功！'
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