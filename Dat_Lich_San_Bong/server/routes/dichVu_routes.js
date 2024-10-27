var express = require("express");
var router = express.Router();
const dichVuController = require("../controller/dichVu_controller");
router.get("/getDichVus", dichVuController.getListServices);
router.post("/addDichVu", dichVuController.addService);
router.put("/updateDichVu/:id", dichVuController.updateService);
router.delete("/deleteDichVu/:id", dichVuController.deleteService);
module.exports = router;
