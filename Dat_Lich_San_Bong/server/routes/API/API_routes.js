var express = require("express");
var router = express.Router();

const sanBongRouter = require("../API/sanBong_routes");
const datLichRouter = require("../API/datLich_routes");
const caLamViecRouter = require("../API/caLamViec_routes");
const dichVuRouter = require("../API/dichVu_routes");
const nhanVienRouter = require('../API/nhanVien_routes');
const sanPhamRouter = require("../API/sanPham_routes");
const thanhToanRouter = require("./API/thanhToan_routes");
const theLoaiRouter = require("../API/theLoai_routes");


router.use("/fields", sanBongRouter);
router.use("/bookings", datLichRouter);
router.use("/shifts",caLamViecRouter);
router.use("/services",dichVuRouter);
router.use("/staffs",nhanVienRouter);
router.use("/products",sanPhamRouter);

router.use('/categories',theLoaiRouter)


module.exports = router;
