const { SanPhamModel } = require("../model/sanPham_model");
const mongoose = require("mongoose");
const COMMON = require("../COMMON");
const Uploads = require("../config/upload");

exports.getListProduct = async (req, res, next) => {
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
    
}
