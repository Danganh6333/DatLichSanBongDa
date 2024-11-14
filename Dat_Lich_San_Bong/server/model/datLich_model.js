const db = require("../config/db")

const DatLichSchema = new db.Schema({
    id_NguoiDung: {
        type: db.Schema.Types.ObjectId,
        ref: "NguoiDungModel",
        required: true
    },
    id_SanBong: {
        type: db.Schema.Types.ObjectId,
        ref: "SanBongModel",
        required: true
    },
    id_CaLamViec: {
        type: db.Schema.Types.ObjectId,
        ref: "CaLamViecModel",
        required: true
    },
    ngayDatLich: {
        type: Date,
        default: Date,
        required: true
    },
    ngayBatDau: {
        type: Date,
        required: true
    },
    ngayKetThuc: {
        type: Date,
        required: true
    },
    trangThai: {
        type: String,
        enum: ["Mới Đặt", "Đặt Hết", "Hủy bỏ"],
        default: "Mới Đặt"
    },
}, {
    collection: 'datLichs'
})


const DatLichModel = db.model("DatLichModel", DatLichSchema);
module.exports = { DatLichModel }