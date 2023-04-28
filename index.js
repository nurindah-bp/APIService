const express = require('express')
const app = express()
const port = 3000
const { connectDB } = require('./services/db');

const AuthRoute = require("./routes/auth.js");
const PegawaiRoute = require("./routes/pegawai.js");
const ProyekRoute = require("./routes/proyek.js");
const TugasRoute = require("./routes/tugas.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors()); 

app.use("/auth", AuthRoute);
app.use("/pegawai", PegawaiRoute);
app.use("/proyek", ProyekRoute);
app.use("/tugas", TugasRoute);

(async () => {
  try {
    await connectDB();
    app.listen(port, function () {
      console.log(`Listening to Port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})(); 