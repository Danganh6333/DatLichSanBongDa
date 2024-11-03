var express = require("express");
var router = express.Router();
const datLichController = require("../../controller/datLich_controller")
router.get("/getDatLichs", datLichController.getListBookings);
router.post("/addDatLich", datLichController.addBooking);
router.put("/updateTrangThaiDatLich/:id", datLichController.updateBookingStatus);
module.exports = router;