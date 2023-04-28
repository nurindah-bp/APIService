const express = require("express");
const response = require('../response');
const { BidangModel, PegawaiModel } = require("../models");
const router = express.Router(express.json());

router.get("/", async (req, res) => {
    const findPegawai = await PegawaiModel.findAll({ 
        where: { status_pegawai : '1'}
    })

    return response(200, findPegawai, res)
});

router.get("/division", async (req, res) => {
    const findBidang = await BidangModel.findAll({ 
        where: { status_bidang : '1'}
    })

    return response(200, findBidang, res)
});

module.exports = router; 