const DivisionModel = require("./division.js");
const PositionModel = require("./position.js");
const EmployeeModel = require("./employee.js");
const ProjectModel = require("./project.js");
const ProjectTaskModel = require("./project_task.js");
const ProjectTaskProgressModel = require("./project_task_progress.js");
const TaskModel = require("./task.js");
const TaskProgressModel = require("./task_progress.js");
const UserLoginModel = require("./user_login.js");

//  userlogin -> pegawai
UserLoginModel.belongsTo(EmployeeModel, {
    foreignKey: "employee_id",
    as: "pegawai",
});

// pegawai -> userlogin
EmployeeModel.hasOne(UserLoginModel, {
    foreignKey: "employee_id",
    as: "user",
});

// proyek -> pegawai
ProjectModel.belongsTo(EmployeeModel,{
    foreignKey: "employee_id",
    as: "pegawai"
});

// pegawai -> proyek
EmployeeModel.hasMany(ProjectModel,{
    foreignKey: "employee_id",
    as: "proyek"
});

// tugasproyek -> proyek
ProjectTaskModel.belongsTo(ProjectModel,{
    foreignKey: "project_id",
    as: "proyek"
});

// tugasproyek -> pegawai
ProjectTaskModel.belongsTo(EmployeeModel,{
    foreignKey: "employee_id",
    as: "pegawai"
});

// progrestugasproyek -> tugasproyek
ProjectTaskProgressModel.belongsTo(ProjectTaskModel,{
    foreignKey: "ptask_id",
    as: "tugas_proyek"
});

// tugas -> pegawai
TaskModel.belongsTo(EmployeeModel,{
    foreignKey: "employee_id",
    as: "pegawai",
});

// pegawai -> tugas
EmployeeModel.hasMany(TaskModel,{
    foreignKey: "employee_id",
    as: "tugas"
});

// progrestugas -> tugasproyek
TaskProgressModel.belongsTo(ProjectTaskModel,{
    foreignKey: "task_id",
    as: "tugas_proyek"
});

// pegawai -> bidang
EmployeeModel.belongsTo(DivisionModel,{
    foreignKey: "division_id",
    as: "bidang"
});

// pegawai -> jabatan
EmployeeModel.belongsTo(PositionModel,{
    foreignKey: "position_id",
    as: "jabatan"
});

// bidang -> pegawai
DivisionModel.hasMany(EmployeeModel,{
    foreignKey: "division_id",
    as: "pegawai"
});

module.exports = {
    DivisionModel,
    PositionModel, 
    EmployeeModel, 
    ProjectTaskProgressModel, 
    TaskProgressModel, 
    ProjectModel, 
    ProjectTaskModel, 
    TaskModel, 
    UserLoginModel
}; 