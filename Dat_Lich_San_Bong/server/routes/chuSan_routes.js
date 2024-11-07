const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { getListUsers  } = require("../controller/nguoiDung_controller");
const { getListFields,addField,deleteField,updateField } = require("../controller/sanBong_controller");
const { getListShifts } = require("../controller/caLamViec_controller");
const { getListServices } = require("../controller/dichVu_controller");
const { getListProducts,addProduct,deleteProduct,updateProduct } = require("../controller/sanPham_controller");

const chuSanLayout = "../views/layouts/chuSan";

/**
 * Get
 * /nguoiDung
 */
router.get("/chuSan/nguoiDung", authenticate, authorize("admin"), getListUsers);
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
router.post("/chuSan/sanBong/themSanBong", authenticate, authorize("admin"),addField)
/**
 * DELETE
 * /sanBong
 */
router.delete("/chuSan/sanBong/xoaSanBong/:id", authenticate, authorize("admin"),deleteField)
/**
 * PUT
 * /sanBong
 */
router.put("/chuSan/sanBong/suaSanBong/:id", authenticate, authorize("admin"),updateField)

//TODO 
/**
 * Get
 * /nuocUong
 */
router.get("/chuSan/nuocUong",authenticate,authorize("admin"),getListProducts);
/**
 * POST
 * /nuocUong
 */
router.post("/chuSan/nuocUong/themNuocUong",authenticate,authorize("admin"),addProduct);
/**
 * DELETE
 * /nuocUong
 */
router.delete("/chuSan/nuocUong/xoaNuocUong",authenticate,authorize("admin"),deleteProduct);
/**
 * PUT
 * /nuocUong
 */
router.put("/chuSan/nuocUong/suaNuocUong",authenticate,authorize("admin"),updateProduct);

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
router.post("/chuSan/doThue/themDoThue", authenticate, authorize("admin"), getListServices);
/**
 * Get
 * /doThue
 */
router.delete("/chuSan/doThue/xoaDoThue", authenticate, authorize("admin"), getListServices);
/**
 * Get
 * /doThue
 */
router.put("/chuSan/doThue", authenticate, authorize("admin"), getListServices);

//TODO
/**
 * Get
 * /ca
 */
router.get("/chuSan/ca", authenticate, authorize("admin"), getListShifts);
/**
 * Get
 * /ca
 */
router.get("/chuSan/ca", authenticate, authorize("admin"), getListShifts);
/**
 * Get
 * /ca
 */
router.get("/chuSan/ca", authenticate, authorize("admin"), getListShifts);
/**
 * Get
 * /ca
 */
router.get("/chuSan/ca", authenticate, authorize("admin"), getListShifts);





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

module.exports = router;
