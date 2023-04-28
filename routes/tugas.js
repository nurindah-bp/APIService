const express = require("express");
const response = require('../response');
const { TugasModel, ProgresTugasModel,  } = require("../models");
const router = express.Router(express.json());

router.get("/taskList", async (req, res) => {
    if (`${req.query.sttask}` === '1') {
        status_tugas = [0,1]
    } else {
        status_tugas = [req.query.sttask]
    }
    const findTugas = await TugasModel.findAll({
        where: { status_tugas: status_tugas },
        include: ['pegawai']
    })

    return response(200, findTugas, res)
});

router.get("/taskDetil", async (req, res) => {
    const findTugasDetil = await TugasModel.findAll({
        where: { id_tugas : req.query.idtask },
        include: ['pegawai']
    })

    return response(200, findTugasDetil, res)
});

router.get("/taskProgress", async (req, res) => {
    const findProgresTugas = await ProgresTugasModel.findAll({
        where: { id_tugas : req.query.idtask }
    })

    return response(200, findProgresTugas, res)
});

module.exports = router; 