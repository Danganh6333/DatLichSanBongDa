var express = require("express");
var router = express.Router();

const sanBongRouter = require("./sanBong_routes");
const datLichRouter = require("./datLich_routes");
const caLamViecRouter = require("./caLamViec_routes");
const dichVuRouter = require("./dichVu_routes");
const nguoiDungRouter = require("./nguoiDung_routes");
const nhanVienRouter = require('./nhanVien_routes');
const sanPhamRouter = require("./sanPham_routes");
const thanhToanRouter = require("./thanhToan_routes");
const theLoaiRouter = require("./theLoai_routes");


router.use("/fields", sanBongRouter);
router.use("/bookings", datLichRouter);
router.use("/shifts",caLamViecRouter);
router.use("/services",dichVuRouter);
router.use("/staffs",nhanVienRouter);
router.use("/products",sanPhamRouter);

router.use('/categories',theLoaiRouter)


module.exports = router;
