const BidangModel = require("./bidang.js");
const JabatanModel = require("./jabatan.js");
const PegawaiModel = require("./pegawai.js");
const ProgresTugasModel = require("./progres_tugas.js");
const ProgresTugasProyekModel = require("./progres_tugas_proyek.js");
const ProyekModel = require("./proyek.js");
const TugasModel = require("./tugas.js");
const TugasProyekModel = require("./tugas_proyek.js");
const UserLoginModel = require("./user_login.js");

//  userlogin -> pegawai
UserLoginModel.belongsTo(PegawaiModel, {
    foreignKey: "id_pegawai",
    as: "pegawai",
});

// pegawai -> userlogin
PegawaiModel.hasOne(UserLoginModel, {
    foreignKey: "id_pegawai",
    as: "user",
});

// tugas -> pegawai
TugasModel.belongsTo(PegawaiModel,{
    foreignKey: "id_pegawai",
    as: "pegawai",
});

// pegawai -> tugas
PegawaiModel.hasMany(TugasModel,{
    foreignKey: "id_pegawai",
    as: "tugas"
});

// proyek -> pegawai
ProyekModel.belongsTo(PegawaiModel,{
    foreignKey: "id_pegawai",
    as: "pegawai"
});

// pegawai -> proyek
PegawaiModel.hasMany(ProyekModel,{
    foreignKey: "id_pegawai",
    as: "proyek"
});

// tugasproyek -> proyek
TugasProyekModel.belongsTo(ProyekModel,{
    foreignKey: "id_proyek",
    as: "proyek"
});

// progrestugasproyek -> tugasproyek
ProgresTugasProyekModel.belongsTo(TugasProyekModel,{
    foreignKey: "id_tugas",
    as: "tugas_proyek"
});

// progrestugas -> tugasproyek
ProgresTugasModel.belongsTo(TugasProyekModel,{
    foreignKey: "id_tugas",
    as: "tugas_proyek"
});

// tugasproyek -> pegawai
TugasProyekModel.belongsTo(PegawaiModel,{
    foreignKey: "id_pegawai",
    as: "pegawai"
});

// pegawai -> bidang
PegawaiModel.belongsTo(BidangModel,{
    foreignKey: "id_bidang",
    as: "bidang"
});

// pegawai -> jabatan
PegawaiModel.belongsTo(JabatanModel,{
    foreignKey: "id_jabatan",
    as: "jabatan"
});

// bidang -> pegawai
BidangModel.hasMany(PegawaiModel,{
    foreignKey: "id_bidang",
    as: "pegawai"
});

module.exports = {
    BidangModel,
    JabatanModel, 
    PegawaiModel, 
    ProgresTugasProyekModel, 
    ProgresTugasModel, 
    ProyekModel, 
    TugasProyekModel, 
    TugasModel, 
    UserLoginModel
}; 