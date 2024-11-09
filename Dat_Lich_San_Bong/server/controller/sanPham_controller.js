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
    const data = await SanPhamModel.find().sort({ createdAt: -1 });
    res.render("chuSan/nuocUong", { locals, layout: chuSanLayout, data });
  } catch (error) {
    console.log(error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { tenSanPham, moTaSanPham, giaSanPham, hangTonKho } = req.body;
    let anhSanPham = null;
    if (req.file) {
      anhSanPham = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    const newSanPham = new SanPhamModel({
      tenSanPham,
      moTaSanPham,
      anhSanPham,
      giaSanPham,
      hangTonKho,
    });

    await newSanPham.save();
    res.redirect("/chuSan/nuocUong");
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
    const { tenSanPham, moTaSanPham, giaSanPham, hangTonKho } = req.body;
    const capNhatAnh = await SanPhamModel.findById(id_SanPham);
    let anhSanPham = capNhatAnh.anhSanPham;

    if (req.file) {
      anhSanPham = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    await SanPhamModel.findByIdAndUpdate(
      id_SanPham,
      {
        tenSanPham,
        moTaSanPham,
        anhSanPham,
        giaSanPham,
        hangTonKho,
      },
      {
        new: true,
      }
    );
    res.redirect("/chuSan/nuocUong");
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

    await SanPhamModel.findByIdAndDelete(id_SanPham);
    res.redirect("/chuSan/nuocUong");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy xóa sản phẩm" });
  }
};
