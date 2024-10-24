var express = require("express");
var router = express.Router();
const nhanVienController = require("../controller/nhanVien_controller");
router.get("/getNhanViens", nhanVienController.getListStaffs);
router.post("/addNhanVien", nhanVienController.addStaff);
router.put("/updateNhanVien/:id", nhanVienController.updateStaff);
router.delete("/deleteNhanVien/:id", nhanVienController.deleteStaff);
module.exports = router;