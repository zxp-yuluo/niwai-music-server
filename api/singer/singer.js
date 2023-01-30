const router = require('koa-router')();
const nwQuery = require('../../db/database');
const dayjs = require('dayjs');

router.prefix('/singer');

// 添加歌手
router.post('/', async ctx => {
  const { singer, avatar, create_author } = ctx.request.body
  const sql = "INSERT INTO singers (singer,avatar,create_author,create_time)  VALUES (?,?,?,?)"
  const querySql = "SELECT * FROM singers WHERE singer=?"
  const create_time = dayjs().format('YYYY-MM-DD  HH:mm:ss')
  const params = [singer, avatar, create_author, create_time]
  let result
  try {
    result = await nwQuery(querySql, singer)
    if (result.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: '歌手已存在！'
      }
    }
    result = await nwQuery(sql, params)
    result = await nwQuery(querySql, singer)
    ctx.body = {
      status: 1,
      data: result[0],
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

// 获取歌手信息
router.get('/:pageNum/:pageSize', async ctx => {
  const { pageSize, pageNum } = ctx.request.params
  const sql = "SELECT SQL_CALC_FOUND_ROWS * FROM singers LIMIT ?,?"
  const totalSql = "SELECT FOUND_ROWS() as total;"
  const params = [(pageNum - 1) * pageSize, Number(pageSize)]
  try {
    const result = await nwQuery(sql, params)
    const totalResult = await nwQuery(totalSql)
    const { total } = totalResult[0]
    const pages = Math.ceil(total / pageSize)
    result.map(item => {
      return item.create_time = dayjs(item.create_time).format('YYYY-MM-DD  HH:mm:ss')
    })
    ctx.body = {
      status: 1,
      data: {
        list: result.reverse(),
        pageNum,
        pageSize,
        pages,
        total
      },
      message: '获取成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '获取失败！' + error.message
    }
  }
})

// 根据id删除歌手
router.delete('/:id', async ctx => {
  const { id } = ctx.request.params
  const sql = "DELETE FROM singers WHERE id=?"
  try {
    await nwQuery(sql, id)
    ctx.body = {
      status: 1,
      data: {},
      message: "删除成功！"
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: "删除失败！" + error.message
    }
  }
})

// 根据id修改歌手信息
router.put('/:id', async ctx => {
  const { id } = ctx.request.params
  const { singer, avatar } = ctx.request.body
  const tempObj = { singer, avatar }
  let sql = "UPDATE singers SET "
  const querySql = "SELECT * FROM singers WHERE singer=?"
  for (const key in tempObj) {
    if (Object.hasOwnProperty.call(tempObj, key)) {
      sql += key + '=' + "'" + tempObj[key] + "'" + ','
    }
  }
  sql = sql.slice(0, sql.length - 1) + ' WHERE id=?'
  let result
  try {
    result = await nwQuery(querySql, id)
    if (result.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: '歌手已存在！'
      }
    }
    await nwQuery(sql, id)
    result = await nwQuery(querySql, id)
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