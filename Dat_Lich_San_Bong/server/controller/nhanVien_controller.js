const { NguoiDungModel } = require("../model/nguoiDung_model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const chuSanLayout = "../views/layouts/chuSan";

exports.getListStaffs = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
      userName: req.user.hoTen,
      currentRoute: `/chuSan`,
    };
    const data = await NguoiDungModel.find({ vaiTro: "staff" }).sort({
      createdAt: -1,
    });
    res.render("chuSan/nhanVien", { locals, layout: chuSanLayout, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách nhan vien" });
  }
};

exports.addStaff = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { hoTen, email, phoneNumber, matKhau } = req.body;

    const existingUser = await NguoiDungModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại." });

    const hashedPassword = await bcrypt.hash(matKhau, 10);

    const newNhanVien = new NguoiDungModel({
      hoTen,
      email,
      phoneNumber,
      vaiTro: "staff",
      matKhau: hashedPassword,
      trangThai: "Hoạt động",
    });

    await newNhanVien.save();
    res.redirect("/chuSan/nhanVien");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm nhân viên" });
  }
};

exports.updateStaff = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_NhanVien = req.params.id;
    const { hoTen, email, phoneNumber, trangThai } = req.body;
 
    
    if (!mongoose.Types.ObjectId.isValid(id_NhanVien)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    console.log(req.body);
    
    await NguoiDungModel.findByIdAndUpdate(
      id_NhanVien,
      {
        hoTen,
        email,
        phoneNumber,
        trangThai,
      },
      { new: true }
    );

    res.redirect("/chuSan/nhanVien");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật nhân viên" });
  }
};

exports.deleteStaff = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_NhanVien = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_NhanVien)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    await NguoiDungModel.findByIdAndDelete(id_NhanVien);
    res.redirect("/chuSan/nhanVien");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy xóa nhân viên" });
  }
};
