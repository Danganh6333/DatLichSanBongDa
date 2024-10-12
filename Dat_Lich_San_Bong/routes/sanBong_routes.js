var express = require("express");
var router = express.Router();
const sanBongController = require("../controller/sanBong_controller");
router.get("/getSanBong", sanBongController.getListField);
router.post("/addSanBong", sanBongController.addField);
router.put("/updateSanBong/:id", sanBongController.updateField);
module.exports = router;