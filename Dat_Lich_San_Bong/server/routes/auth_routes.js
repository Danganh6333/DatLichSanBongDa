const express = require("express");
const router = express.Router();
const { NguoiDungModel } = require("../model/nguoiDung_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

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

router.post("/auth/signup", async (req, res) => {
  try {
    const { hoTen, email, phoneNumber, vaiTro, matKhau } = req.body;

    const existingUser = await NguoiDungModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại." });

    const hashedPassword = await bcrypt.hash(matKhau, 10);

    const newUser = new NguoiDungModel({
      hoTen,
      email,
      phoneNumber,
      vaiTro,
      matKhau: hashedPassword,
      trangThai: "Hoạt động",
    });

    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/auth/signin", async (req, res) => {
  try {
    const { email, matKhau } = req.body;
    const user = await NguoiDungModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác." });
    const isMatch = await bcrypt.compare(matKhau, user.matKhau);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác." });
    const token = jwt.sign({ id: user._id, vaiTro: user.vaiTro }, JWT_SECRET, {
      expiresIn: "1h",
    });
  
    console.log("Hello",user.vaiTro,token);
    
    if (user.vaiTro === "user") {
      res.cookie("token", token, { httpOnly: true }).redirect("/khachHang");
    } else if (user.vaiTro === "staff") {
      res.cookie("token", token, { httpOnly: true }).redirect("/nhanVien");
    } else if (user.vaiTro === "admin") {
      res.cookie("token", token, { httpOnly: true }).redirect("/chuSan");
    } else {
      res.status(400).json({ message: "Vai trò không xác định." });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
