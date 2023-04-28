const express = require("express");
const response = require('../response');
const { ProyekModel, TugasProyekModel } = require("../models");
const router = express.Router(express.json());

router.get("/projectList", async (req, res) => {
    if (`${req.query.stproject}` === '1') {
        status_proyek = [0,1]
    } else {
        status_proyek = [req.query.stproject]
    }
    const findProyek = await ProyekModel.findAll({
        where: { status_proyek: status_proyek },
        include: ['pegawai']
    })

    return response(200, findProyek, res)
});

router.get("/projecttaskList", async (req, res) => {
    if (`${req.query.sttask}` === '1') {
        status_tugas = [0,1]
    } else {
        status_tugas = [req.query.sttask]
    }
    const findTugasProyek = await TugasProyekModel.findAll({
        where: { status_tugas: status_tugas },
        include: ['pegawai']
    })

    return response(200, findTugasProyek, res)
});

module.exports = router; 