const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {addTransactions} = require("../controller/thanhToan_controller")
const {
  addBooking,
  getBookingsData,
  updateBookingStatus,
  deleteBooking,
  getListBookings,
} = require("../controller/datLich_controller");

const {
  findShiftsById
} = require("../controller/caLamViec_controller")

const {logOut} = require("../controller/nguoiDung_controller")

const khachHangLayout = "../views/layouts/khachHang";

router.get("/khachHang", authenticate, authorize("user"), async (req, res) => {
  try {
    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
      userName: req.user.hoTen,
      currentRoute: `/khachHang`,
    };
    res.render("khachHang/index", { locals, layout: khachHangLayout });
  } catch (error) {
    console.log(error);
  }
});

router.get(
  "/khachHang/datLich",
  authenticate,
  authorize("user"),
  getListBookings
);

router.get("/caLamViec/timCaLamViec/:id",authenticate, authorize("user"),findShiftsById)

router.get("/khachHang/datLich/lich", authenticate, authorize("user"), getBookingsData)
router.post("/khachHang/datLich/dat", authenticate, authorize("user"),addBooking);
router.delete('/khachHang/datLich/xoaLich/:id', authenticate, authorize("user"),deleteBooking);

router.post("/thanhToan",addTransactions)
router.get("/dangXuat",logOut)
module.exports = router;
