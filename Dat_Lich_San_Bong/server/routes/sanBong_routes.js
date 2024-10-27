var express = require("express");
var router = express.Router();
const sanBongController = require("../controller/sanBong_controller");
router.get("/getSanBongs", sanBongController.getListFields);
router.post("/addSanBong", sanBongController.addField);
router.put("/updateSanBong/:id", sanBongController.updateField);
router.delete("/deleteSanBong/:id", sanBongController.deleteField);
module.exports = router;