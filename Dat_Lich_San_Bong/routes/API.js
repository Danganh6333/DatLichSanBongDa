var express = require("express");
var router = express.Router();

const sanBongRouter = require("./sanBong_routes");
const datLichRouter = require("./datLich_routes");

router.use("/fields", sanBongRouter);
router.use("/bookings", datLichRouter);

module.exports = router;
