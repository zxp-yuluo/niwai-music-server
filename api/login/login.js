const router = require('koa-router')();
const md5 = require('md5');
const nwQuery = require('../../db/database');
const { generateToken, verifyToken } = require('../../token/token')

// 登录
router.post('/login', async ctx => {
  const {username,password} = ctx.request.body
  // const sql = 'SELECT * FROM users WHERE username=?'
  const sql = `
  SELECT u.id,u.username,u.password,u.create_time,u.role_id,r.menus FROM users u LEFT OUTER JOIN roles r
  ON u.role_id=r.id 
  WHERE u.username=?
  `  
  
  try {
    const result = await nwQuery(sql,username)
    const token = generateToken({
      id: result.id,
      username: result.username,
      role: result.role,
      create_time: result.create_time
    })
    // 判断是否有该用户名的数据
    if(!result.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: '该用户不存在！'
      }
      return
    }
    const {password:resultPassword} = result[0]
    // 判断密码是否正确
    if(md5(password) !== resultPassword) {
      ctx.body = {
        status: 0,
        data: null,
        message: '密码不正确！'
      }
      return
    }
    delete result[0].password
    ctx.body = {
      status: 1,
      data: result[0],
      message: '登录成功！',
      token
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