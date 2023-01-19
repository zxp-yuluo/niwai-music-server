const router = require('koa-router')();
const nwQuery = require('../../db/database');
const dayjs = require('dayjs');

router.prefix('/songs');

// 添加歌曲   
router.post('/', async ctx => {
  const { song_name, author_name, lyrics, image, album_name, url,create_author } = ctx.request.body
  const create_time = new Date().toLocaleString()
  const sql = "INSERT INTO songs(song_name,author_name,album_name,url,create_time,create_author,lyrics,image) VALUES (?,?,?,?,?,?,?,?)"
  const querySql = "SELECT  * FROM songs WHERE url=?"
  const params = [
    song_name,
    author_name,
    album_name?album_name:'',
    url,
    create_time,
    create_author,
    lyrics?lyrics:'',
    image?image:''
  ]
  try {
    await nwQuery(sql,params)
    const result = await nwQuery(querySql,url)
    ctx.body = {
      status: 1,
      data: result[0],
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

// 根据关键字搜索获取用户歌曲列表
router.get('/search/:keywordType/:keyword/:create_author/:pageNum/:pageSize', async ctx => {
  const { keywordType, keyword, create_author, pageNum, pageSize } = ctx.request.params
  let sql
  let params = [create_author, keyword, (pageNum - 1) * pageSize, Number(pageSize)]
  switch (keywordType) {
    case 'all':
      sql = 'SELECT SQL_CALC_FOUND_ROWS * FROM songs WHERE create_author=? LIMIT ?,?;'
      params = [create_author,(pageNum - 1) * pageSize, Number(pageSize)]
      break;
    case 'singer':
      sql = 'SELECT SQL_CALC_FOUND_ROWS * FROM songs WHERE create_author=? AND author_name like ? LIMIT ?,?;'
      params = [create_author,'%' + keyword + '%', (pageNum - 1) * pageSize, Number(pageSize)]
      break;
    case 'song':
      sql = 'SELECT SQL_CALC_FOUND_ROWS * FROM songs WHERE create_author=? AND song_name=? LIMIT ?,?;'
      break;
  }
  const totalSql = "SELECT FOUND_ROWS() as total;"
  try {
    const result = await nwQuery(sql, params)
    const totalResult = await nwQuery(totalSql)
    const {total} = totalResult[0]
    const pages = Math.ceil(total/pageSize)
    ctx.body = {
      status: 1,
      data: {
        list: result,
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
      message: '请求失败：' + error.message
    }
  }
})

// 根据id删除歌曲
router.delete('/:id', async ctx => {
  const {id} = ctx.request.params
  const sql = "DELETE FROM songs WHERE id=?"
  try {
    const result = await nwQuery(sql,id)
    ctx.body = {
      status: 1,
      data: {},
      message: '删除成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '删除失败！'
    }
  }
})

// 根据id修改歌曲
router.put('/:id', async ctx => {
  const {id} = ctx.request.params
  const { song_name, author_name, lyrics, image, album_name, url } = ctx.request.body
  const tempObj = {song_name, author_name, lyrics, image, album_name, url}
  let sql = "UPDATE songs SET " 
  for (const key in tempObj) {
    if (Object.hasOwnProperty.call(tempObj, key)) {
      sql += key + '=' + "'" + tempObj[key] + "'" + ','
    }
  }
  sql = sql.slice(0,sql.length - 1) + ' WHERE id=?'
  try {
    const result = await nwQuery(sql,id)
    ctx.body = {
      status: 1,
      data: result,
      message: '修改成功！'
    }
  } catch (error) {
    ctx.body = {
      status: 0,
      data: null,
      message: '请求错误：' + error.message
    }
  }
})

module.exports = router