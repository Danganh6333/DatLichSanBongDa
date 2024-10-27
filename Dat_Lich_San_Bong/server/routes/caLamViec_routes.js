var express = require("express");
var router = express.Router();
const caLamViecController = require("../controller/caLamViec_controller");
router.get("/getCaLamViecs", caLamViecController.getListShifts);
router.post("/addCaLamViec", caLamViecController.addShift);
router.put("/updateCaLamViec/:id", caLamViecController.updateShift);
router.delete("/deleteCaLamViec/:id",caLamViecController.deleteShift);
module.exports = router;