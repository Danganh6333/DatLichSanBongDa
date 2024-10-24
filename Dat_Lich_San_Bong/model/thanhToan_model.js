const db = require("../config/db")

const ThanhToanSchema = new db.Schema({
    id_DatLich : {
        type: db.Schema.Types.ObjectId,
        ref: "DatLichModel",
        required :true
    },
    tongTien : {
        type : Number,
        required : true
    },
    ngayChuyenKhoan : {
        type : Number,
        required: true
    }
},{
    collection:'thanhToans'
})

const ThanhToanModel = db.model("ThanhToanModel",ThanhToanSchema)
module.exports = {ThanhToanModel}