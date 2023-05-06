const express = require("express");
const response = require('../response');
const { ProjectModel, ProjectTaskModel, ProjectTaskProgressModel } = require("../models");
const { sequelize } = require("../services/db");
const router = express.Router(express.json());

router.get("/projectList", async (req, res) => {
    if (`${req.query.stproject}` === '1') {
        project_status = [0, 1]
    } else {
        project_status = [req.query.stproject]
    }
    const findAllProject = await ProjectModel.findAll({
        where: { project_status: project_status },
        include: ['pegawai']
    })

    return response(200, findAllProject, res)
});

router.get("/ptaskList", async (req, res) => {
    if (`${req.query.stptask}` === '1') {
        ptask_status = [0, 1]
    } else {
        ptask_status = [req.query.stptask]
    }
    const findAllPTask = await ProjectTaskModel.findAll({
        where: { ptask_id: req.query.ptaskid, ptask_status: ptask_status },
        include: ['pegawai']
    })

    return response(200, findAllPTask, res)
});

router.get("/ptaskProgress", async (req, res) => {
    // if (`${req.query.stptaskprogress}` === '1') {
    //     ptask_progressstatus = [0,1]
    // } else {
    //     ptask_progressstatus = [req.query.stptaskprogress]
    // }
    const findPTaskProgress = await ProjectTaskProgressModel.findAll({
        where: { ptask_id: req.query.ptaskid }
    })

    return response(200, findPTaskProgress, res)
});

router.post("/addProj", async (req, res) => {
    // const { projName, projDesc, projPIC, projDate, projDeadline, userID } = req.body
    const projName = req.body.projName;
    const projDesc = req.body.projDesc;
    const projPIC = req.body.projPIC;
    const projDeadline = new Date(req.body.projDeadline);
    const userID = req.body.userID;
    const addProject = await ProjectModel.create(
        {
            project_name: projName,
            project_description: projDesc,
            employee_id: projPIC,
            project_deadline: projDeadline,
            user_id: userID
        }
    );

    return response(200, addProject, res)
});

router.post("/addProjTask", async (req, res) => {
    const { projTaskName, projTaskDesc, projID, projTaskPIC, projTaskDeadline, projTaskUrgent, userID } = req.body
    const addProjTask = await ProjectTaskModel.create(
        {
            ptask_name: projTaskName,
            ptask_description: projTaskDesc,
            project_id: projID,
            employee_id: projTaskPIC,
            ptask_deadline: projTaskDeadline,
            ptask_urgent: projTaskUrgent,
            user_id: userID
        }
    );

    return response(200, addProjTask, res)
});

router.post("/addProjTaskProgress", async (req, res) => {
    const { projTaskProgress, projTaskID, projTaskProgressDate, projTaskProgressStatus } = req.body
    const addProjTaskProgress = await ProjectTaskProgressModel.create(
        {
            ptask_progress: projTaskProgress,
            ptask_id: projTaskID,
            ptask_progressdate: projTaskProgressDate,
            ptask_progressstatus: projTaskProgressStatus,
        }
    )

    // const findPTask = await ProjectTaskProgressModel.findAll({ 
    //     attributes: [[sequelize.fn('COUNT', sequelize.col('ptask_progressid')), 'n_ptpid']],
    //     where: { ptask_id: projTaskID, ptask_progressstatus: 2 },
    // })

    // if(findPTask > 0){
    //     await ProjectTaskModel.update({ 
    //         ptask_status : 2},{
    //         where: { ptask_id: projTaskID },
    //     })
    // }
    return response(200, addProjTaskProgress, res)


});

router.post("/updateProjTask", async (req, res) => {
    const { projTaskName, projTaskDesc, projID, projTaskPIC, projTaskDeadline, projTaskUrgent, projTaskID } = req.body
    const updateProjTask = await ProjectTaskModel.update(
        {
            ptask_name: projTaskName,
            ptask_description: projTaskDesc, 
            project_id: projID,
            employee_id: projTaskPIC,
            ptask_deadline: projTaskDeadline,
            ptask_urgent: projTaskUrgent,
        },
        {
            where: { ptask_id: projTaskID },
        }
    )
    return response(200, updateProjTask, res)
});



module.exports = router; 