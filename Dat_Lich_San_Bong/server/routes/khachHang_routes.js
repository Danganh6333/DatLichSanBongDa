const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { CaLamViecModel } = require("../model/caLamViec_model");
const { SanBongModel } = require("../model/sanBong_model");
const { DatLichModel } = require("../model/datLich_model");
const {
  addBooking,
  updateBookingStatus,
  deleteBooking,
  getListBookings,
} = require("../controller/datLich_controller");

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

router.post("datLich/dat", authenticate, authorize("user"),addBooking);
router.put('datLich/suaLich', authenticate, authorize("user"),updateBookingStatus);
router.delete('datLich/xoaLich', authenticate, authorize("user"),deleteBooking)

router.get("/dangXuat",logOut)
module.exports = router;
