const router = require('koa-router')();
const nwQuery = require('../../db/database');
const dayjs = require('dayjs');

router.prefix('/sheets');

// 添加歌单
router.post('/', async ctx => {
  const { name, describe, create_author,cover } = ctx.request.body
  const create_time = dayjs().format('YYYY-MM-DD  HH:mm:ss')
  const sql = "INSERT INTO song_sheets(`name`,`describe`,create_time,create_author,cover) VALUES(?,?,?,?,?)"
  const querySql = "SELECT * FROM song_sheets WHERE name=?"
  const params = [name, describe, create_time, create_author,cover?cover:'']
  try {
    // 查询歌单名字是否已存在
    const queryResult = await nwQuery(querySql, name)
    if (queryResult.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: '歌单已存在！'
      }
      return
    }
    await nwQuery(sql, params)
    const result = await nwQuery(querySql, name)
    ctx.body = {
      status: 1,
      data: result,
      message: '创建成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '请求失败：' + error.message
    }
  }

})

// 随机获取歌单(6个)
router.get('/recommend', async ctx => {
  const sql = "SELECT * FROM song_sheets"
  try {
    const result = await nwQuery(sql)
    function getArray(length) {
      let tempArr = []
      while (tempArr.length < 6) {
        let num = Math.round(Math.random() * length)
        if (tempArr.indexOf(num) === -1) {
          tempArr.push(num)
        }
      } 
      return tempArr
    }
    const length = result.length
    if (length > 6) {
      const arr = getArray(length)
      let tempArray = []
      for (let index = 0; index < 6; index++) {
        tempArray.push(result[arr[index]])
      }
      ctx.body = {
        status: 1,
        data: tempArray,
        message: '获取成功！'
      }
    } else {
      ctx.body = {
        status: 1,
        data: result.reverse(),
        message: '获取成功！'
      }
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '请求失败：' + error.message
    }
  }
})

// 根据用户名获取用户歌单
router.get('/:username', async ctx => {
  const sql = "SELECT * FROM song_sheets WHERE create_author=?"
  const params = [ctx.request.params.username]
  try {
    const result = await nwQuery(sql, params)
    // 处理时间
    result.map(item => {
      return item.create_time = dayjs(item.create_time).format('YYYY-MM-DD  HH:mm:ss')
    })
    ctx.body = {
      status: 1,
      data: result.reverse(),
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

// 获取所有歌单
router.get('/', async ctx => {
  const sql = "SELECT * FROM song_sheets"
  try {
    const result = await nwQuery(sql)
    ctx.body = {
      status: 1,
      data: result.reverse(),
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

// 根据id删除歌单
router.delete('/:id', async ctx => {
  const { id } = ctx.request.params
  const sql = 'DELETE FROM song_sheets WHERE id=?'
  const querySql = 'SELECT * FROM song_sheets WHERE id=?'
  try {
    const result = await nwQuery(querySql, id)
    if (!result.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: "数据不存在！"
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
      message: '请求失败：' + error.message
    }
  }
})

// 根据id修改歌单
router.put('/:id', async ctx => {
  const { id } = ctx.request.params
  const data = ctx.request.body
  let sql = "UPDATE song_sheets SET "
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      sql += '`' + key + '`' + "=" + "'" + data[key] + "'" + ','
    }
  }
  sql = sql.slice(0, sql.length - 1)
  sql += ' WHERE id=?'
  const querySql = "SELECT * FROM song_sheets WHERE id=?"
  try {
    let result = await nwQuery(querySql, id)
    if (!result.length) {
      ctx.body = {
        status: 0,
        data: null,
        message: "数据不存在！"
      }
      return
    }
    await nwQuery(sql, id)
    result = await nwQuery(querySql, id)
    ctx.body = {
      status: 1,
      data: result,
      message: '修改成功！'
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