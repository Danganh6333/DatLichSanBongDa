const db = require("../config/db")

const SanPhamSchema = new db.Schema({
    tenSanPham : {
        type : String,
        required : true
    },
    moTaSanPham : {
        type : String,
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