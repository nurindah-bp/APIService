const express = require("express");
const response = require('../response');
const { TaskModel, TaskProgressModel, } = require("../models");
const router = express.Router(express.json());
const { Op } = require('sequelize');

router.get("/taskList", async (req, res) => {
    if(`${req.query.position}` === '2'){
        user_id = [req.query.sessionId]
        employee_id = [req.query.sessionId]
    }else{
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
              { employee_id },
              { user_id },
            ],
          },
        include: ['pegawai']
    })

    return response(200, findAllTasks, res)
});

router.get("/taskDetil", async (req, res) => {
    const findTask = await TaskModel.findAll({
        where: { task_id: req.query.idtask },
        include: ['pegawai']
    })

    return response(200, findTask, res)
});

router.get("/taskProgress", async (req, res) => {
    const findProgresTugas = await TaskProgressModel.findAll({
        where: { task_id: req.query.idtask }
    })

    return response(200, findProgresTugas, res)
});

router.post("/addTask", async (req, res) => {
    const { taskName, taskDesc, taskPIC, taskDeadline, taskUrgent, userID } = req.body
    const addTask = await TaskModel.create(
        {
            task_name: taskName,
            task_description: taskDesc,
            employee_id: taskPIC,
            task_deadline: taskDeadline,
            ptask_urgent: taskUrgent,
            user_id: userID
        }
    );

    return response(200, addTask, res)
});

router.post("/addTaskProgress", async (req, res) => {
    const { taskProgress, taskProgressNote, taskID, taskProgressDate, taskProgressStatus } = req.body
    const addTaskProgress = await TaskProgressModel.create(
        {
            task_progress: taskProgress,
            task_progressnote: taskProgressNote,
            task_id: taskID,
            // task_progressdate: taskProgressDate,
            task_progressstatus: taskProgressStatus,
        }
    );

    if(taskProgressStatus == 2){
        await TaskModel.update({ 
            task_status : 2},{
            where: { task_id: taskID },
        })
    }

    return response(200, addTaskProgress, res)


});

router.post("/updateTask", async (req, res) => {
    const { taskName, taskDesc, taskPIC, taskDeadline, taskUrgent, taskID, userID } = req.body
    const updateTask = await TaskModel.update(
        {
            task_name: taskName,
            task_description: taskDesc,
            employee_id: taskPIC,
            task_deadline: taskDeadline,
            task_urgent: taskUrgent,
            user_id: userID
        },
        {
            where: { task_id: taskID },
        }
    )
    return response(200, updateTask, res)
});

module.exports = router; 