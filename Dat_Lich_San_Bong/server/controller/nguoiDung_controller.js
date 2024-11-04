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
      res.cookie("token", token, { httpOnly: true }).redirect("/chuSan/nguoiDung");
    } else {
      res.status(400).json({ message: "Vai trò không xác định." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getListUsers = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
      userName: req.user.hoTen,
      currentRoute: `/chuSan`,
    };
    const data = await NguoiDungModel.find().sort({ createdAt: -1 });
    res.render("chuSan/nguoiDung", { locals, layout: chuSanLayout, data });
  } catch (error) {
    console.log(error);
  }
};
