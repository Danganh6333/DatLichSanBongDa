const db = require("../config/db")

const DatLichSchema = new db.Schema({
    id_NguoiDung : {
        type : db.Schema.Types.ObjectId,
        ref: "NguoiDungModel",
        required : true
    },
    id_SanBong : {
        type : db.Schema.Types.ObjectId,
        ref: "SanBongModel",
        required : true
    },
    ngayDatLich : {
        type : Date,
        default : Date,
        required : true
    },
    ngayBatDau : {
        type : Date,
        required : true
    },
    ngayKetThuc : {
        type : Date,
        required : true
    },
    trangThai : {
        type : String,
        enum : ["Đang chờ","Xác nhận","Hủy bỏ"],
        default : "Đang chờ"
    },
    tongTien : {
        type : Number,
        required : true
    }
},{
    collection : 'datLichs'
})


const DatLichModel = db.model("DatLichModel",DatLichSchema);
module.exports = { DatLichModel }