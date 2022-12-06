const mysql = require('mysql');
const { host, user, port, password, database } = require('../config')

const pool = mysql.createPool({
  host,
  user,
  port,
  password,
  database
})

module.exports = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, params, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
          connection.release();
        })
      }
    })
  })
}