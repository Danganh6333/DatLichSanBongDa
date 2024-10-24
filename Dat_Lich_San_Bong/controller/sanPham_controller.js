const { SanPhamModel } = require("../model/sanPham_model");
const mongoose = require("mongoose");
const COMMON = require("../COMMON");

exports.getListProducts = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const SanPhams = await SanPhamModel.find()
      .populate("id_TheLoai")
      .sort({ createdAt: -1 });
    console.log(SanPhams);

    res.status(200).json(SanPhams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách sản phẩm" });
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const { id_TheLoai, tenSanPham, moTaSanPham, gia, hangTonKho } = req.body;
    let anhSanPham = null;
    if (req.file) {
      anhSanPham = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    const newSanPham = new SanPhamModel({
      id_TheLoai,
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
    await mongoose.connect(COMMON.uri);
    const id_SanPham = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_SanPham)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const { id_TheLoai, tenSanPham, moTaSanPham, gia, hangTonKho } = req.body;
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
    await mongoose.connect(COMMON.uri);
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
