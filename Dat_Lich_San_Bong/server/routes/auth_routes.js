const express = require("express");
const router = express.Router();
const { NguoiDungModel } = require("../model/nguoiDung_model");
const {SignUp, SignIn} = require("../controller/nguoiDung_controller");

const authLayout = "../views/layouts/auth";

router.get("/auth", async (req, res) => {
  try {
    const locals = {
      title: "Đăng Nhập / Đăng Ký",
      description: "Trang đăng nhập và đăng ký người dùng của Golden Stadium.",
    };
    res.render("auth/auth", { locals, layout: authLayout });
  } catch (error) {
    console.log(error);
  }
});
router.post("/auth/signup", SignUp);
router.post("/auth/signin", SignIn);

module.exports = router;
