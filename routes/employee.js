const express = require("express");
const response = require('../response');
const { DivisionModel, EmployeeModel, PositionModel } = require("../models");
const router = express.Router(express.json());

router.get("/", async (req, res) => {
    const findAllEmployee = await EmployeeModel.findAll({ 
        where: { employee_status : '1'}
    })

    return response(200, findAllEmployee, res)
});

router.get("/division", async (req, res) => {
    const findAllDivision = await DivisionModel.findAll({ 
        where: { division_status : '1'}
    })

    return response(200, findAllDivision, res)
});

router.get("/position", async (req,res) => {
    const findAllPosition = await PositionModel.findAll({
        where: { position_status : '1' }
    })
    return response(200, findAllPosition, res)
});

module.exports = router; 