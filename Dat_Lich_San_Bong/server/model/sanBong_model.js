const db = require("../config/db")

const SanBongSchema = new db.Schema({
    tenSan : {
        type : String,
        required : true
    },
    diaDiem : {
        type : String,
        required : true
    },
    giaTheoGio : {
        type : Number ,
        min : 0,
        max : 2000000
    },
    trangThai : {
        type : String,
        enum : ["Trống","Đang Dùng","Bảo Trì"]
    }
},{
    collection : "sanBongs"
})

const SanBongModel = db.model("SanBongModel",SanBongSchema);
module.exports = { SanBongModel }