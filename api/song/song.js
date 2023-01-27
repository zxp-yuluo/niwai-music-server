const router = require('koa-router')();
const nwQuery = require('../../db/database');
const dayjs = require('dayjs');

router.prefix('/songs');

// 添加歌曲   
router.post('/', async ctx => {
  const { song_name, author_name, url, create_author } = ctx.request.body
  let { album_name, lyrics, image } = ctx.request.body
  lyrics ? lyrics : ''
  image ? image : ''
  console.log(song_name, author_name, url, create_author, album_name, lyrics, image);
  const create_time = new Date().toLocaleString()
  const sql = "INSERT INTO songs(song_name,author_name,author_id,album_name,album_id,url,create_time,create_author,lyrics,image) VALUES (?,?,?,?,?,?,?,?,?,?)"
  const querySql = "SELECT  * FROM songs WHERE url=?"
  const singerSql = "SELECT id FROM singers WHERE singer=?"
  const albumSql = "SELECT id FROM albums WHERE album=?"

  try {
    console.log('singerSql:',singerSql);
    console.log('albumSql:',albumSql);
    console.log(album_name,'album_name');
    console.log(lyrics,'lyrics');
    console.log(image,'image');
    let album_id = null
    let author_id = null
    let albumResult
    if(album_name) {
      albumResult = await nwQuery(albumSql, album_name)
      if (albumResult.length) {
        album_id = albumResult[0].id
      }
    }else {
      album_name = ''
      album_id = null
    }
    const singerResult = await nwQuery(singerSql, author_name)
    console.log(singerResult, albumResult);
    
    
    if (singerResult.length) {
      author_id = singerResult[0].id
    }
    let params = [
      song_name,
      author_name,
      author_id,
      album_name,
      album_id,
      url,
      create_time,
      create_author,
      lyrics,
      image
    ]
    console.log(sql, '------------', querySql,params);
    await nwQuery(sql, params)
    const result = await nwQuery(querySql, url)
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
  try {
    let sql = "SELECT role_id FROM users WHERE username=?"
    let params
    let str
    // 获取用户信息
    const info = await nwQuery(sql, create_author)
    const { role_id } = info[0]
    if (role_id === '1') {
      str = ''
      params = []
    } else {
      str = ' WHERE create_author=?'
      params = [create_author]
    }
    switch (keywordType) {
      case 'all':
        sql = `SELECT SQL_CALC_FOUND_ROWS * FROM songs ${str} LIMIT ?,?;`
        params = [...params, (pageNum - 1) * pageSize, Number(pageSize)]
        break;
      case 'singer':
        sql = `SELECT SQL_CALC_FOUND_ROWS * FROM songs WHERE ${str} AND author_name like ? LIMIT ?,?;`
        params = [...params, '%' + keyword + '%', (pageNum - 1) * pageSize, Number(pageSize)]
        break;
      case 'song':
        sql = `SELECT SQL_CALC_FOUND_ROWS * FROM songs WHERE ${str} AND song_name=? LIMIT ?,?;`
        break;
    }
    const totalSql = "SELECT FOUND_ROWS() as total;"
    //-------------------------------
    const result = await nwQuery(sql, params)
    const totalResult = await nwQuery(totalSql)
    const { total } = totalResult[0]
    const pages = Math.ceil(total / pageSize)
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
  const { id } = ctx.request.params
  const sql = "DELETE FROM songs WHERE id=?"
  try {
    const result = await nwQuery(sql, id)
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
  const { id } = ctx.request.params
  const { song_name, author_name, lyrics, image, album_name, url } = ctx.request.body
  const tempObj = { song_name, author_name, lyrics, image, album_name, url }
  let sql = "UPDATE songs SET "
  for (const key in tempObj) {
    if (Object.hasOwnProperty.call(tempObj, key)) {
      sql += key + '=' + "'" + tempObj[key] + "'" + ','
    }
  }
  sql = sql.slice(0, sql.length - 1) + ' WHERE id=?'
  const querySql = "SELECT  * FROM songs WHERE id=?"
  try {
    await nwQuery(sql, id)
    const result = await nwQuery(querySql, id)
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