const db = require("../config/db")

const NguoiDungSchema = new db.Schema({
    hoTen: {
        type:String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },  
    vaiTro : {
        type: String,
        enum: ["user", "staff", "admin"],
        default : "user"
    },
    matKhau:{
        type:String,
        required : true
    },
    trangThai:{
        type: String,
        enum: ["Hoạt động", "Không hoạt động"],
        default : "Hoạt động"
    },
    ngayDangKy : {
        type: Date,
        default: Date.now
    }
},{
    collection: 'nguoiDungs'
});

const NguoiDungModel = db.model("NguoiDungModel",NguoiDungSchema);
module.exports = { NguoiDungModel }

