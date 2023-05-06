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

router.post("/updatePass", async (req, res) => {
    const { userID, oldPass, newPass} = req.body

    const findUser= await UserLoginModel.findOne({
        where: {user_id: userID}
    })
    
    if(findUser.password === oldPass){
        const updatePass = await UserLoginModel.update(
            {
                password: newPass,
            },
            {
                where: { user_id: findUser.user_id },
            }
        )
        return response(200, updatePass, res)
    }else{
        return response(404, 'Old Password Invalid!', res)
    }
    
});

module.exports = router; 