const { TheLoaiModel } = require("../model/theLoai_model");
const mongoose = require("mongoose");
const COMMON = require("../COMMON");

exports.getListCategories = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const TheLoais = await TheLoaiModel.find().sort({ createdAt: -1 });
    console.log(TheLoais);

    res.status(200).json(TheLoais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách thể loại" });
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const { tenTheLoai } = req.body;

    let anhTheLoai = null;
    if (req.file) {
      anhTheLoai = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    const newTheLoai = new TheLoaiModel({
      tenTheLoai,
      anhTheLoai,
    });
    const savedTheLoai = await newTheLoai.save();
    res.status(201).json(savedTheLoai);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách thể loại" });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    
  } catch (error) {

  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
  } catch (error) {}
};
