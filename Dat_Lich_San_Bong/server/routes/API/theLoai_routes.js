var express = require("express");
var router = express.Router();
const theLoaiController = require("../../controller/theLoai_controller");
router.get("/getTheLoai", theLoaiController.getListCategories);
router.post("/addTheLoai", theLoaiController.addCategory);
router.put("/updateTheLoai/:id", theLoaiController.updateCategory);
router.delete("/deleteTheLoai/:id")
module.exports = router;