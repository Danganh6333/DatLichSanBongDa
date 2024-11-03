var express = require("express");
var router = express.Router();
const sanPhamController = require("../../controller/sanPham_controller");
router.get("/getSanPhams", sanPhamController.getListProducts);
router.post("/addSanPham", sanPhamController.addProduct);
router.put("/updateSanPham/:id", sanPhamController.updateProduct);
router.delete("/deleteSanPham/:id",sanPhamController.deleteProduct)
module.exports = router;