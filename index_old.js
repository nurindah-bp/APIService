// app.post('/login', (req, res) => {
//   // const {nip, passwd} = req.body
//   const nip = req.body.nip;
//   const password = req.body.password;
//   const sql = `SELECT a.id_login, a.username, a.password  , b.noinduk_pegawai, b.nama_pegawai FROM user_login a
// 	LEFT JOIN pegawai b ON a.id_pegawai = b.id_pegawai  where b.noinduk_pegawai = '${nip}' and a.password = '${password}'`
//   db.query(sql, (error, result) => {
//     // console.log(result)
//     if (error) throw error
//     response(200, result, "Get User", res)
//   })
// })

// // app.post('/login', (req,res)=> {
// //   const nip = req.params.nip;
// //   const password = req.params.password;

// //    console.log({requestFromOutside: req.body});
// //   // res.send({
// //   //   'nip': nip,
// //   //   'password': password,
// //   // });
// //   res.send();
// // })

// app.get('/division', (req, res) => {
//   const sql = `SELECT * FROM bidang WHERE status_bidang = 1`
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Division", res)
//   })
// })

// app.get('/pegawai', (req, res) => {
//   const sql = `SELECT * FROM pegawai WHERE status_pegawai = 1`
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Employee", res)
//   })
// })

// app.get('/projectList', (req, res) => {
//   if (`${req.query.stproject}` === '1'){
//     whereStatus = `status_proyek in (0,1) `
//   }else{
//     whereStatus = `status_proyek in (${req.query.stproject}) `
//   }
//   const sql = `SELECT a.*, b.nama_pegawai FROM proyek a LEFT JOIN pegawai b on a.id_pegawai = b.id_pegawai WHERE ` + whereStatus
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Active Proyek", res)
//   })
// })

// app.get('/projecttaskList', (req, res) => {
//   if (`${req.query.sttask}` === '1'){
//     whereStatus = `status_tugas in (0,1) `
//   }else{
//     whereStatus = `status_tugas in (${req.query.sttask}) `
//   }
//   const sql = `SELECT a.*, b.nama_pegawai FROM tugas_proyek a LEFT JOIN pegawai b on a.id_pegawai = b.id_pegawai WHERE id_proyek = ${req.query.idproj} and ` + whereStatus
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Active Task", res)
//   })
// })

//// (
// app.get('/projecttaskDetil', (req, res) => {
//   const sql = `SELECT a.*, b.nama_pegawai FROM tugas_proyek a LEFT JOIN pegawai b on a.id_pegawai = b.id_pegawai WHERE id_tugas = ${req.query.idtask}`
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Active Task", res)
//   })
// })

// app.get('/projecttaskProgress', (req, res) => {
//   const sql = `SELECT * FROM progres_tugas_proyek WHERE id_tugas = ${req.query.idtask}`
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Active Task", res)
//   })
// })
//// )

// app.get('/taskList', (req, res) => {
//   if (`${req.query.sttask}` === '1'){
//     whereStatus = `status_tugas in (0,1) `
//   }else{
//     whereStatus = `status_tugas in (${req.query.sttask}) `
//   }
//   const sql = `SELECT a.*, b.nama_pegawai FROM tugas a LEFT JOIN pegawai b on a.id_pegawai = b.id_pegawai WHERE ` + whereStatus
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Active Task", res)
//   })
// })

// app.get('/taskDetil', (req, res) => {
//   const sql = `SELECT a.*, b.nama_pegawai FROM tugas a LEFT JOIN pegawai b on a.id_pegawai = b.id_pegawai WHERE id_tugas = ${req.query.idtask}`
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Active Task", res)
//   })
// })

// app.post('/projectLists', (req, res) => {
//   const {date, dateTo, idPegawai, statusProyek} = req.body
//   let whereIdPeg = ''
//   let whereStatus = ''
//   if ((`${idPegawai}`)) {
//     whereIdPeg = `and id_pegawai = '${idPegawai}'`
//   }else{
//     whereIdPeg = ''
//   }

//   if (`${statusProyek}` === '1' ){
//     whereStatus = `and status_proyek in (0,1) `
//   }else{
//     whereStatus = `and status_proyek in (${statusProyek}) `
//   }
//   const sql = `SELECT * FROM proyek WHERE DATE(tgl_proyek) BETWEEN '${date}' AND '${dateTo}' ` + whereStatus + whereIdPeg
//   // console.log(sql)
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Project", res)
//   })
// })

// app.post('/taskLists', (req, res) => {
//   const {idProyek, date, dateTo, idPegawai, statusTugas} = req.body
//   let whereIdPeg = ''
//   if ((`${idPegawai}`)) {
//     whereIdPeg = `and id_pegawai = '${idPegawai}'`
//   }else{
//     whereIdPeg = ''
//   }
//   if (`${statusTugas}` === '1' ){
//     whereStatus = `and status_tugas in (0,1) `
//   }else{
//     whereStatus = `and status_tugas in (${statusTugas}) `
//   }
//   const sql = `SELECT * FROM tugas WHERE id_proyek = '${idProyek}' AND DATE(tgl_tugas) BETWEEN '${date}' AND '${dateTo}' ` + whereStatus + whereIdPeg
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, `Get All Task of Project ${idProyek}`, res)
//   })
// })

// app.get('/taskProgress', (req, res) => {
//   const sql = `SELECT * FROM progres_tugas WHERE id_tugas = ${req.query.idtask}`
//   db.query(sql, (error, result) => {
//     if (error) throw error
//     response(200, result, "Get All Active Task", res)
//   })
// })

// app.post('/pegawai', (req, res) => {
//   const {noinduk, namaPegawai, idJabatan, idBidang} = req.body
//   const sql = `INSERT INTO pegawai (noinduk_pegawai, nama_pegawai, id_jabatan, id_bidang) VALUES ('${noinduk}', '${namaPegawai}', ${idJabatan}, ${idBidang})`

//   db.query(sql, (error, result) => {
//     if (error) response (500, "Invalid", "Error!", res)
//     if (result?.affectedRows) {
//       const data = {
//         isSuccess: result.affectedRows,
//         id: result.insertId,
//       }
//       response(200, data, "Data Added Successfuly", res)
//     }
//   })
// })
