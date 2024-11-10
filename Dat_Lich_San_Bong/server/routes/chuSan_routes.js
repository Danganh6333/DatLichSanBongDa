const express = require("express");
const router = express.Router();
const Upload = require("../config/upload");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {
  getListFields,
  addField,
  deleteField,
  updateField,
} = require("../controller/sanBong_controller");
const {
  getListShifts,
  addShift,
  deleteShift,
  updateShift,
} = require("../controller/caLamViec_controller");
const {
  getListServices,
  addService,
  deleteService,
  updateService,
} = require("../controller/dichVu_controller");
const {
  getListProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/sanPham_controller");
const {
  getListStaffs,
  addStaff,
  deleteStaff,
  updateStaff,
} = require("../controller/nhanVien_controller");
const chuSanLayout = "../views/layouts/chuSan";

//TODO
/**
 * GET
 * /nhanVien
 */
router.get("/chuSan/nhanVien", authenticate, authorize("admin"), getListStaffs);
/**
 * POST
 * /nhanVien
 */
router.post(
  "/chuSan/nhanVien/themNhanVien",
  authenticate,
  authorize("admin"),
  addStaff
);
/**
 * DELETE
 * /nhanVien
 */
router.delete(
  "/chuSan/nhanVien/xoaNhanVien/:id",
  authenticate,
  authorize("admin"),
  deleteStaff
);
/**
 * PUT
 * /nhanVien
 */
router.put(
  "/chuSan/nhanVien/suaNhanVien/:id",
  authenticate,
  authorize("admin"),
  updateStaff
);

//TODO
/**
 * GET
 * /sanBong
 */
router.get("/chuSan/sanBong", authenticate, authorize("admin"), getListFields);
/**
 * POST
 * /sanBong
 */
router.post(
  "/chuSan/sanBong/themSanBong",
  authenticate,
  authorize("admin"),
  addField
);
/**
 * DELETE
 * /sanBong
 */
router.delete(
  "/chuSan/sanBong/xoaSanBong/:id",
  authenticate,
  authorize("admin"),
  deleteField
);
/**
 * PUT
 * /sanBong
 */
router.put(
  "/chuSan/sanBong/suaSanBong/:id",
  authenticate,
  authorize("admin"),
  updateField
);

//TODO
/**
 * Get
 * /nuocUong
 */
router.get(
  "/chuSan/nuocUong",
  authenticate,
  authorize("admin"),
  getListProducts
);
/**
 * POST
 * /nuocUong
 */
router.post(
  "/chuSan/nuocUong/themNuocUong",
  authenticate,
  authorize("admin"),
  Upload.single("anhSanPham"),
  addProduct
);
/**
 * DELETE
 * /nuocUong
 */
router.delete(
  "/chuSan/nuocUong/xoaNuocUong/:id",
  authenticate,
  authorize("admin"),
  deleteProduct
);
/**
 * PUT
 * /nuocUong
 */
router.put(
  "/chuSan/nuocUong/suaNuocUong/:id",
  authenticate,
  authorize("admin"),
  Upload.single("anhSanPham"),
  updateProduct
);

//TODO
/**
 * Get
 * /doThue
 */
router.get("/chuSan/doThue", authenticate, authorize("admin"), getListServices);
/**
 * POST
 * /doThue
 */
router.post(
  "/chuSan/doThue/themDoThue",
  authenticate,
  authorize("admin"),
  Upload.single("anhDichVu"),
  addService
);
/**
 * DELETE
 * /doThue
 */
router.delete(
  "/chuSan/doThue/xoaDoThue/:id",
  authenticate,
  authorize("admin"),
  deleteService
);
/**
 * PUT
 * /doThue
 */
router.put(
  "/chuSan/doThue/suaDoThue/:id",
  authenticate,
  authorize("admin"),
  Upload.single("anhDichVu"),
  updateService
);

//TODO
/**
 * Get
 * /ca
 */
router.get(
  "/chuSan/caLamViec",
  authenticate,
  authorize("admin"),
  getListShifts
);
/**
 * POST
 * /ca
 */
router.post(
  "/chuSan/caLamViec/themCaLamViec",
  authenticate,
  authorize("admin"),
  addShift
);
/**
 * DELETE
 * /ca
 */
router.delete(
  "/chuSan/caLamViec/xoaCaLamViec/:id",
  authenticate,
  authorize("admin"),
  deleteShift
);
/**
 * PUT
 * /ca
 */
router.put(
  "/chuSan/caLamViec/suaCaLamViec/:id",
  authenticate,
  authorize("admin"),
  updateShift
);

router.get(
  "/chuSan/giaoCa",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    try {
      const locals = {
        title: "Trang Chủ",
        description:
          "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
        userName: req.user.hoTen,
        currentRoute: `/giaoCa`,
      };

      res.render("chuSan/giaoCa", { locals, layout: chuSanLayout });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/chuSan/thongKe",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    try {
      const locals = {
        title: "Trang Chủ",
        description:
          "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
        userName: req.user.hoTen,
        currentRoute: `/thongKe`,
      };

      res.render("chuSan/thongKe", { locals, layout: chuSanLayout });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get(
  "/chuSan/thamSo",
  authenticate,
  authorize("admin"),
  async (req, res) => {
    try {
      const locals = {
        title: "Trang Chủ",
        description:
          "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
        userName: req.user.hoTen,
        currentRoute: `/thamSo`,
      };

      res.render("chuSan/thamSo", { locals, layout: chuSanLayout });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
