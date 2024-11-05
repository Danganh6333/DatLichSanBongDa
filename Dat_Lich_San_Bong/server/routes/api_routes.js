var express = require("express");
var router = express.Router();
const upload = require("../config/upload");
const {
  getListShifts,
  addShift,
  updateShift,
  deleteShift,
} = require("../controller/caLamViec_controller");
const {
  getListBookings,
  addBooking,
  updateBookingStatus,
} = require("../controller/datLich_controller");
const {
  getListServices,
  addService,
  updateService,
  deleteService,
} = require("../controller/dichVu_controller");
const {
  getListFields,
  addField,
  updateField,
  deleteField,
} = require("../controller/sanBong_controller");
const {
  getListProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/sanPham_controller");
const {
  getListStaffs,
  addStaff,
  updateStaff,
  deleteStaff,
} = require("../controller/nhanVien_controller");

const {} = require("../controller/thanhToan_controller");

//Ca Làm Việc API
router.get("/caLamViecs/getCaLamViecs", getListShifts);
router.post("/caLamViecs/addCaLamViec", addShift);
router.put("/caLamViecs/updateCaLamViec/:id", updateShift);
router.delete("/caLamViecs/deleteCaLamViec/:id", deleteShift);

//Đặt Lịch API
router.get("/datLichs/getDatLichs", getListBookings);
router.post("/datLichs/addDatLich", addBooking);
router.put("/datLichs/updateTrangThaiDatLich/:id", updateBookingStatus);

//Dịch Vụ API
router.get("/dichVus/getDichVus", getListServices);
router.post("/dichVus/addDichVu", upload.single("anhDichVu"), addService);
router.put(
  "/dichVus/updateDichVu/:id",
  upload.single("anhDichVu"),
  updateService
);
router.delete("/dichVus/deleteDichVu/:id", deleteService);

//Nhân Viên API
router.get("/nhanViens/getNhanViens", getListStaffs);
router.post("/nhanViens/addNhanVien", addStaff);
router.put("/nhanViens/updateNhanVien/:id", updateStaff);
router.delete("/nhanViens/deleteNhanVien/:id", deleteStaff);

//Sân Bóng API
router.get("/sanBongs/getSanBongs", getListFields);
router.post("/sanBongs/addSanBong", addField);
router.put("/sanBongs/updateSanBong/:id", updateField);
router.delete("/sanBongs/deleteSanBong/:id", deleteField);

//Sản Phẩm API
router.get("/sanPhams/getSanPhams", getListProducts);
router.post("/sanPhams/addSanPham", upload.single("anhSanPham"), addProduct);
router.put(
  "/sanPhams/updateSanPham/:id",
  upload.single("anhSanPham"),
  updateProduct
);
router.delete("/sanPhams/deleteSanPham/:id", deleteProduct);

//Thanh Toán API

module.exports = router;
