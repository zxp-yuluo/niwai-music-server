const router = require('koa-router')();
const nwQuery = require('../../db/database');
const dayjs = require('dayjs');
router.prefix('/roles');

// 添加角色
router.post('/', async ctx => {
  const {role_name} = ctx.request.body
  const create_time = new Date().toLocaleString()
  const sql ="INSERT INTO roles (role_name,create_time) VALUES (?,?)"
  const querySql ="SELECT * FROM roles WHERE role_name=?"
  const params = [role_name,create_time]
  try {
    let queryResult = await nwQuery(querySql,role_name)
    if(queryResult.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: '角色已存在！'
      }
      return 
    }
    const result = await nwQuery(sql,params)
    queryResult = await nwQuery(querySql,role_name)
    ctx.body = {
      status: 1,
      data: queryResult[0],
      message: '添加成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '添加失败！' + error.message
    }
  }
  
})

// 获取角色
router.get('/', async ctx => {
  const sql = "SELECT * FROM roles"
  try {
    let result = await nwQuery(sql)
    result.map(item => {
      item.create_time = dayjs(item.create_time).format('YYYY-MM-DD  HH:mm:ss')
      item.auth_time ? item.auth_time = dayjs(item.create_time).format('YYYY-MM-DD  HH:mm:ss') : null
      return item
    })
    ctx.body = {
      status: 1,
      data: result.reverse(),
      message: '获取成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: result,
      message: '获取失败！' + error.message
    }
  }
})

// 角色授权
router.put('/:id', async ctx => {
  const {auth_name,menus} = ctx.request.body
  const {id} = ctx.request.params
  const auth_time = new Date().toLocaleString()
  const sql = "UPDATE roles SET auth_time=?,auth_name=?,menus=? WHERE id=?"
  const querySql ="SELECT * FROM roles WHERE id=?"
  const params = [auth_time,auth_name,JSON.stringify(menus),id]
  try {
    await nwQuery(sql,params)
    const result = await nwQuery(querySql,id)
    ctx.body = {
      status: 1,
      data: result[0],
      message: '授权成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '授权失败！' + error.message
    }
  }
})

module.exports = router