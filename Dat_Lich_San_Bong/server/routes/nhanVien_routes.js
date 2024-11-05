var express = require("express");
var router = express.Router();

const { authenticate, authorize } = require("../middleware/authMiddleware");

const nhanVienLayout = "../views/layouts/nhanVien";

router.get("/nhanVien", authenticate, authorize("staff"), async (req, res) => {
  try {
    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
    };
    res.render("nhanVien/index", { locals, layout: nhanVienLayout });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
