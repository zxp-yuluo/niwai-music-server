const router = require('koa-router')();
const md5 = require('md5');
const {verifyToken} = require('../../token/token')

const nwQuery = require('../../db/database');

// router.prefix('/users');

// 添加用户
router.post('/users', async ctx => {
  const username = ctx.request.body.username
  const password = md5(ctx.request.body.password)
  const create_time = new Date().toLocaleString()
  const sql = "INSERT INTO users (username,password,create_time,role)  VALUES (?,?,?,?)"
  const querySql = 'SELECT * FROM users WHERE username=?'
  const params = [username, password, create_time, '']
  try {
    // 查询用户是否已存在
    const queryResult = await nwQuery(querySql, username)
    if (queryResult.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: '用户已存在！'
      }
      return
    }
    // 添加用户
    const addResult = await nwQuery(sql, params)
    // 查询添加的用户
    const result = await nwQuery(querySql, username)
    delete result[0].password
    ctx.body = {
      status: 1,
      data: result,
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

// 获取用户
router.get('/users', async ctx => {
  console.log(ctx.request.headers.authorization);
  const {authorization} = ctx.request.headers
  if(!authorization) {
    ctx.throw(401)
    return
  }
  const boolean = verifyToken(authorization.replace('niwai_',''))
  console.log(boolean);
  const {id} = ctx.request.query
  const allSql = 'SELECT * FROM users'
  const sql = 'SELECT * FROM users WHERE id=?'
  let result
  try {
    if(id) {
      result = await nwQuery(sql,id)
    }else {
      result = await nwQuery(allSql)
    }
    console.log('result:',result);
    ctx.body = {
      status: 1,
      data: result,
      message: '获取成功！'
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