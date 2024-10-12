const db = require("../config/db")

const SanPhamSchema = new db.Schema({
    id_TheLoai : {
        type: db.Schema.Types.ObjectId,
        ref: "TheLoaiModel",
        required :true
    },
    tenSanPham : {
        type : String,
        required : true
    },
    moTaSanPham : {
        type : String,
        required : true
    },
    anhSanPham : {
        type : String,
        required : true
    },
    giaSanPham : {
        type : Number,
        required : true
    },
    hangTonKho : {
        type : Number,
        required : true
    }
}, {
    collection:"sanPhams"
})

const SanPhamModel = db.model("SanPhamModel",SanPhamSchema);
module.exports = {SanPhamModel}