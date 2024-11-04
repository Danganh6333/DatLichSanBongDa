const { SanPhamModel } = require("../model/sanPham_model");
const mongoose = require("mongoose");

const chuSanLayout = "../views/layouts/chuSan";

exports.getListProducts = async (req, res, next) => {
  try {
    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
      userName: req.user.hoTen,
      currentRoute: `/nuocUong`,
    };
    const data = await SanPhamModel.find()
      .populate("id_TheLoai")
      .sort({ createdAt: -1 });
    res.render("chuSan/nuocUong", { locals, layout: chuSanLayout, data });
  } catch (error) {
    console.log(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { tenSanPham, moTaSanPham, gia, hangTonKho } = req.body;
    let anhSanPham = null;
    if (req.file) {
      anhSanPham = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    const newSanPham = new SanPhamModel({
      tenSanPham,
      moTaSanPham,
      anhSanPham,
      gia,
      hangTonKho,
    });

    const savedSanPham = await newSanPham.save();
    res.status(201).json(savedSanPham);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm" });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_SanPham = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_SanPham)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const { tenSanPham, moTaSanPham, gia, hangTonKho } = req.body;
    let anhSanPham = null;
    if (req.file) {
      anhSanPham = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    const updatedSanPham = await SanPhamModel.findByIdAndUpdate(
      id_SanPham,
      {
        tenSanPham,
        moTaSanPham,
        anhSanPham,
        gia,
        hangTonKho,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedSanPham);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật sản phẩm" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_SanPham = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_SanPham)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const deletedSanPham = await SanPhamModel.findByIdAndDelete(id_SanPham);
    res.status(200).json(deletedSanPham);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy xóa sản phẩm" });
  }
};
