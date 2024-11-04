var express = require("express");
var router = express.Router();

const dichVuController = require("../controller/dichVu_controller");
const theLoaiController = require("../controller/theLoai_controller");
const caLamViecController = require("../controller/caLamViec_controller");
const datLichController = require("../controller/datLich_controller");
const sanBongController = require("../controller/sanBong_controller");
const sanPhamController = require("../controller/sanPham_controller");

router.get("/dichVus/getDichVus", dichVuController.getListServices);
router.post("/dichVus/addDichVu", dichVuController.addService);
router.put("/dichVus/updateDichVu/:id", dichVuController.updateService);
router.delete("/dichVus/deleteDichVu/:id", dichVuController.deleteService);


router.get("/theLoais/getTheLoai", theLoaiController.getListCategories);
router.post("/theLoais/addTheLoai", theLoaiController.addCategory);
router.put("/theLoais/updateTheLoai/:id", theLoaiController.updateCategory);
router.delete("/theLoais/deleteTheLoai/:id",theLoaiController.deleteCategory)


router.get("/caLamViecs/getCaLamViecs", caLamViecController.getListShifts);
router.post("/caLamViecs/addCaLamViec", caLamViecController.addShift);
router.put("/caLamViecs/updateCaLamViec/:id", caLamViecController.updateShift);
router.delete("/caLamViecs/deleteCaLamViec/:id",caLamViecController.deleteShift);


router.get("/datLichs/getDatLichs", datLichController.getListBookings);
router.post("/datLichs/addDatLich", datLichController.addBooking);
router.put("/datLichs/updateTrangThaiDatLich/:id", datLichController.updateBookingStatus);


router.get("/dichVus/getDichVus", dichVuController.getListServices);
router.post("/dichVus/addDichVu", dichVuController.addService);
router.put("/dichVus/updateDichVu/:id", dichVuController.updateService);
router.delete("/dichVus/deleteDichVu/:id", dichVuController.deleteService);


router.get("/sanBongs/getSanBongs", sanBongController.getListFields);
router.post("/sanBongs/addSanBong", sanBongController.addField);
router.put("/sanBongs/updateSanBong/:id", sanBongController.updateField);
router.delete("/sanBongs/deleteSanBong/:id", sanBongController.deleteField);

router.get("/sanPhams/getSanPhams", sanPhamController.getListProducts);
router.post("/sanPhams/addSanPham", sanPhamController.addProduct);
router.put("/sanPhams/updateSanPham/:id", sanPhamController.updateProduct);
router.delete("/sanPhams/deleteSanPham/:id",sanPhamController.deleteProduct);

module.exports = router;
