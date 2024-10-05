const db = require("../config/db")

const NhanVienSchema = new db.Schema({
    id_NguoiDung : {
        type : db.Schema.Types.ObjectId,
        ref:"NguoiDungModel",
        required: true
    },
    id_CaLamViec : {
        type : db.Schema.Types.ObjectId,
        ref: "CaLamViecModel",
        required: true
    },
    NgayVaoLam : {
        type : Date.now("dd/mm/yyyy"),
        required : true
    },
    NgayThoiLam : {
        type : Date
    }
},{
    collection: "nhanViens"
})

const NhanVienModel = db.model("NhanVienModel",NhanVienSchema)
module.exports = { NhanVienModel }
