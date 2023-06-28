const express = require("express");
const response = require('../response');
const { ProjectTaskModel, TaskModel } = require("../models");
const { sequelize, Sequelize } = require("../services/db");
const router = express.Router(express.json());
const { Op } = require('sequelize');

router.get("/ptaskList", async (req, res) => {
    if (`${req.query.position}` === '2') {
        user_id = [req.query.sessionId]
        employee_id = [req.query.sessionId]
    } else {
        user_id = []
        employee_id = [req.query.sessionId]
    }
    if (`${req.query.stptask}` === '1') {
        ptask_status = [0, 1]
    } else {
        ptask_status = [req.query.stptask]
    }
    const findAllPTask = await ProjectTaskModel.findAll({
        where: {
                ptask_status: {
                    [Op.in]: ptask_status,
                },
                [Op.or]: [
                    { employee_id },
                ],
                [Op.and]: [
                    Sequelize.literal("DATE(project_task.ptask_deadline) - DATE(NOW()) < '5'"),
                ],
            },
        include: ['pegawai'],
        // order: [['ptask_deadline', 'DESC']],
        limit: 3,
    })

    return response(200, findAllPTask, res)
});

router.get("/taskList", async (req, res) => {
    if (`${req.query.position}` === '2') {
        user_id = [req.query.sessionId]
        employee_id = [req.query.sessionId]
    } else {
        user_id = []
        employee_id = [req.query.sessionId]
    }
    if (`${req.query.sttask}` === '1') {
        task_status = [0, 1]
    } else {
        task_status = [req.query.sttask]
    }
    const findAllTasks = await TaskModel.findAll({
        // where: {task_status: task_status},
        where: {
            task_status: {
                [Op.in]: task_status,
            },
            [Op.or]: [
                { employee_id },,
            ],
            [Op.and]: [
                sequelize.literal("DATEDIFF(task.task_deadline, NOW()) < '5'"),
            ],
        },
        include: ['pegawai'],
        // order: [['task_deadline', 'DESC']],
        limit: 3,
    })

    return response(200, findAllTasks, res)
});

module.exports = router; 