// 播放列表
const router = require('koa-router')();
const nwQuery = require('../../db/database');
const dayjs = require('dayjs');

router.prefix('/play');

module.exports = router