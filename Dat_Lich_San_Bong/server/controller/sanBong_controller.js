const { SanBongModel } = require("../model/sanBong_model");
const mongoose = require("mongoose");

const chuSanLayout = "../views/layouts/chuSan";
exports.getListFields = async (req, res, next) => {
  try {
    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
      userName: req.user.hoTen,
      currentRoute: `/sanBong`,
    };
    const data = await SanBongModel.find().sort({ createdAt: -1 });

    res.render("chuSan/sanBong", { locals, layout: chuSanLayout, data });
  } catch (error) {
    console.log(error);
  }
};

exports.addField = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { tenSan, diaDiem, giaTheoGio, trangThai } = req.body;

    const newSanBong = new SanBongModel({
      tenSan,
      diaDiem,
      giaTheoGio,
      trangThai,
    });
    await newSanBong.save();
    res.redirect("/chuSan/sanBong");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm sân bóng" });
  }
};

exports.updateField = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const id_SanBong = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_SanBong)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const { tenSan, diaDiem, giaTheoGio, trangThai } = req.body;

    await SanBongModel.findByIdAndUpdate(
      id_SanBong,
      { tenSan, giaTheoGio, trangThai },
      { new: true }
    );

    res.redirect("/chuSan/sanBong");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật sân bóng" });
  }
};

exports.deleteField = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_SanBong = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_SanBong)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    await SanBongModel.findByIdAndDelete(id_SanBong);
    res.redirect("/chuSan/sanBong");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi xóa sân bóng" });
  }
};
