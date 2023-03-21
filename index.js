const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/login', (req, res) => {
  const {username, passwd} = req.body
  const sql = `SELECT username, password FROM user_login where username = '${username}' and password = '${passwd}'`
  db.query(sql, (error, result) => {
    // console.log(result)
    if (error) throw error
    if (`${username}` === "admin"){
      console.log("Sukses Login!")
    }
  })
})

app.get('/division', (req, res) => {
  const sql = `SELECT * FROM bidang WHERE status_bidang = 1`
  db.query(sql, (error, result) => {
    if (error) throw error
    response(200, result, "Get All Division", res)
  })
})

app.post('/projectList', (req, res) => {
  const {date, dateTo, idPegawai, statusProyek} = req.body
  let whereIdPeg = ''
  let whereStatus = ''
  if ((`${idPegawai}`)) {
    whereIdPeg = `and id_pegawai = '${idPegawai}'`
  }else{
    whereIdPeg = ''
  }

  if (`${statusProyek}` === '1' ){
    whereStatus = `and status_proyek in (0,1) `
  }else{
    whereStatus = `and status_proyek in (${statusProyek}) `
  }
  const sql = `SELECT * FROM proyek WHERE DATE(tgl_proyek) BETWEEN '${date}' AND '${dateTo}' ` + whereStatus + whereIdPeg
  // console.log(sql)
  db.query(sql, (error, result) => {
    if (error) throw error
    response(200, result, "Get All Project", res)
  })
})

app.post('/taskList', (req, res) => {
  const {idProyek, date, dateTo, idPegawai, statusTugas} = req.body
  let whereIdPeg = ''
  if ((`${idPegawai}`)) {
    whereIdPeg = `and id_pegawai = '${idPegawai}'`
  }else{
    whereIdPeg = ''
  }
  if (`${statusTugas}` === '1' ){
    whereStatus = `and status_tugas in (0,1) `
  }else{
    whereStatus = `and status_tugas in (${statusTugas}) `
  }
  const sql = `SELECT * FROM tugas WHERE id_proyek = '${idProyek}' AND DATE(tgl_tugas) BETWEEN '${date}' AND '${dateTo}' ` + whereStatus + whereIdPeg
  db.query(sql, (error, result) => {
    if (error) throw error
    response(200, result, `Get All Task of Project ${idProyek}`, res)
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})