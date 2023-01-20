const router = require('koa-router')();
const md5 = require('md5');

const nwQuery = require('../../db/database');

router.prefix('/users');

// 添加用户
router.post('/', async ctx => {
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

// 获取所有用户信息
router.get('/', async ctx => {
  const sql = `
  SELECT u.id,u.username,u.create_time,u.role_id,r.role_name 
  FROM users u LEFT OUTER JOIN roles r
  ON u.role_id=r.id
  `
  try {
    const result = await nwQuery(sql)
    console.log('result:', result);
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

// 根据id获取用户信息
router.get('/:id', async ctx => {
  const { id } = ctx.request.params
  const sql = 'SELECT * FROM users WHERE id=?'
  try {
    const result = await nwQuery(sql, id)
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

// 根据id删除用户信息
router.delete('/:id', async ctx => {
  const { id } = ctx.request.params
  console.log(id);
  const sql = 'DELETE FROM users WHERE id=?'
  const querySql = 'SELECT * FROM users WHERE id=?'
  try {
    const result = await nwQuery(querySql, id)
    if (!result.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: '用户不存在！'
      }
      return
    }
    await nwQuery(sql, id)
    ctx.body = {
      status: 1,
      data: {},
      message: '删除成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '删除失败！' + error.message
    }
  }
})

// 根据id修改用户信息
router.put('/:id', async ctx => {
  const { id } = ctx.request.params
  const temObj = ctx.request.body
  let sql = 'UPDATE users SET '
  for (const key in temObj) {
    if (Object.hasOwnProperty.call(temObj, key)) {
      sql += key + "=" + "'" + temObj[key] + "'" + ','
    }
  }
  sql = sql.slice(0, sql.length - 1) + ' WHERE id=?'
  const querySql = 'SELECT * FROM users WHERE id=?'
  try {
    await nwQuery(sql, id)
    const result = await nwQuery(querySql, id)
    ctx.body = {
      status: 1,
      data: result[0],
      message: '修改成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '修改失败！' + error.message
    }
  }
})

module.exports = router