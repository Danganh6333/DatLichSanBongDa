const db = require("../config/db");

const CaLamViecSchema = new db.Schema(
  {
    tenCa: {
      type: String,
      require: true,
    },
    gioBatDau: {
      type: String,
      required: "true",
    },
    gioKetThuc: {
      type: String,
      required: "true",
    },
    tongTien: {
      type: Number,
      required: "true",
    },
    trangThai: {
      type: String,
      enum: ["Hoạt Động","Dừng Hoạt Động"],
      default: "Hoạt Động",
    },
  },
  {
    collection: "caLamViecs",
  }
);

const CaLamViecModel = db.model("CaLamViecModel", CaLamViecSchema);
module.exports = { CaLamViecModel };
