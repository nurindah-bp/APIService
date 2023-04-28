const express = require("express");
const response = require('../response');
const { UserLoginModel } = require("../models");
const router = express.Router(express.json());

router.post("/login", async (req, res) => {
    // const nip = req.body.nip;
    const username = req.body.username;
    const password = req.body.password;
    const findUser = await UserLoginModel.findOne({ 
        where: { username: req.body.username, password: req.body.password },
        include: ['pegawai']
    })

    return response(200, findUser, res)
});

module.exports = router; 