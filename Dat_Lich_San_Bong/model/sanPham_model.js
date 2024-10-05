const db = require("../config/db")

const SanPhamModel = new db.Schema({
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
        
    }
})