const { DichVuModel } = require("../model/dichVu_model");
const mongoose = require("mongoose");

const chuSanLayout = "../views/layouts/chuSan";

exports.getListServices = async (req, res, next) => {
  try {
    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
      userName: req.user.hoTen,
      currentRoute: `/doThue`,
    };
    const data = await DichVuModel.find().sort({ createdAt: -1 });
    res.render("chuSan/doThue", { locals, layout: chuSanLayout, data });
  } catch (error) {
    console.log(error);
  }
};

exports.addService = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { tenDichVu, giaDichVu,soLuong } = req.body;
    let anhDichVu = null;
    if (req.file) {
      anhDichVu = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    const newDichVu = new DichVuModel({
      tenDichVu,
      anhDichVu,
      giaDichVu,
      soLuong
    });
    await newDichVu.save();
    res.redirect("/chuSan/doThue");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm dịch vụ" });
  }
};

exports.updateService = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const { tenDichVu,trangThai,soLuong, giaDichVu } = req.body;

    const id_DichVu = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_DichVu)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const capNhatAnh = await DichVuModel.findById(id_DichVu);
    let anhDichVu = capNhatAnh.anhDichVu;

    if (req.file) {
      anhDichVu = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    await DichVuModel.findByIdAndUpdate(
      id_DichVu,
      { tenDichVu, anhDichVu, giaDichVu,trangThai,soLuong },
      { new: true }
    );
    res.redirect("/chuSan/doThue");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật dịch vụ" });
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_DichVu = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_DichVu)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    await DichVuModel.findByIdAndDelete(id_DichVu);
    res.redirect("/chuSan/doThue");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi xóa dịch vụ" });
  }
};
