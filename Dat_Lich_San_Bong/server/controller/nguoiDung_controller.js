const { NguoiDungModel } = require("../model/nguoiDung_model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const chuSanLayout = "../views/layouts/chuSan";

exports.SignUp = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
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
};

exports.SignIn = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { email, matKhau } = req.body;
    const user = await NguoiDungModel.findOne({ email });
    
    if (!user)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác." });
    const isMatch = await bcrypt.compare(matKhau, user.matKhau);

    if (user.trangThai !== "Hoạt động") {
      return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên." });
    }

    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác." });
    const token = jwt.sign({ id: user._id, vaiTro: user.vaiTro }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Hello", user.vaiTro, token);

    if (user.vaiTro === "user") {
      res.cookie("token", token, { httpOnly: true }).redirect("/khachHang");
    } else if (user.vaiTro === "staff") {
      res.cookie("token", token, { httpOnly: true }).redirect("/nhanVien");
    } else if (user.vaiTro === "admin") {
      res.cookie("token", token, { httpOnly: true }).redirect("/chuSan/nhanVien");
    } else {
      res.status(400).json({ message: "Vai trò không xác định." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
