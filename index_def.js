const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  response(200, "API v1 Ready To Go", "SUCCESS", res)
})

app.get('/pegawai', (req, res) => {
  const sql = `SELECT * FROM pegawai`
  
  db.query(sql, (error, result) => {
    if (error) throw error
    response(200, result, "get all data pegawai", res)
  })
})

app.get('/pegawai/:noinduk', (req, res) => {
  const noinduk = req.params.noinduk
  const sql = `SELECT * FROM pegawai WHERE noinduk_pegawai = ${noinduk}`
  
  db.query(sql, (error, result) => {
    if (error) throw error
    response(200, result, `get detail data pegawai`, res)
  })
})

app.post('/pegawai', (req, res) => {
  const {noinduk, namaPegawai, idJabatan, idBidang} = req.body
  const sql = `INSERT INTO pegawai (noinduk_pegawai, nama_pegawai, id_jabatan, id_bidang) VALUES ('${noinduk}', '${namaPegawai}', ${idJabatan}, ${idBidang})`

  db.query(sql, (error, result) => {
    if (error) response (500, "Invalid", "Error!", res)
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      }
      response(200, data, "Data Added Successfuly", res)
    }
  })
})

app.put('/pegawai', (req, res) => {
  const {noinduk, namaPegawai, idJabatan, idBidang} = req.body
  const sql = `UPDATE pegawai SET nama_pegawai = '${namaPegawai}', id_jabatan= ${idJabatan}, id_bidang = ${idBidang} WHERE noinduk_pegawai = ${noinduk}`

  db.query(sql, (error, result) => {
    if (error) response (500, "Invalid", "Error!", res)
    if(result?.affectedRows){
      const data = {
        isSuccess: result.affectedRows,
        message: result.message
      }
      response(200, data, "Data Update Successfuly", res)
    }else{
      response(500, "Error", "Data Unavailable", res)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})