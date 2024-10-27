const db = require("../config/db");

const CaLamViecSchema = new db.Schema({
  id_NhanVien: {
    type: db.Schema.Types.ObjectId,
    ref: "NhanVienModel",
  },
  gioBatDau: {
    type: Date,
    required: "true",
  },
  gioKetThuc: {
    type: Date,
    required: "true",
  },
  tongTien: {
    type: Number,
    required: "true",
  },
},{
    collection:"caLamViecs"
});

const CaLamViecModel = db.model('CaLamViecModel',CaLamViecSchema)
module.exports = {CaLamViecModel}