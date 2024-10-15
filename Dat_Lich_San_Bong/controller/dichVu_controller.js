const { DichVuModel } = require("../model/dichVu_model");
const mongoose = require("mongoose");
const COMMON = require("../COMMON");
const e = require("express");

exports.getListService = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const DichVus = await DichVuModel.find().sort({ createdAt: -1 });
    console.log(DichVus);

    res.status(200).json(DichVus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách dịch vụ" });
  }
};

exports.addService = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const { tenDichVu, giaDichVu } = req.body;
    let anhDichVu = null;
    if (req.file) {
      anhDichVu = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    const newDichVu = new DichVuModel({
      tenDichVu,
      anhDichVu,
      giaDichVu,
    });
    const savedDichVu = await newDichVu.save();
    res.status(201).json(savedDichVu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm dịch vụ" });
  }
};

exports.updateService = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const { tenDichVu, giaDichVu } = req.body;
    const id_DichVu = req.params.id;
    let anhDichVu = null;
    if (req.file) {
      anhDichVu = `${req.protocol}://localhost:3000/uploads/${req.file.filename}`;
    }
    const updatedDichVu = await DichVuModel.findByIdAndUpdate(
      id_DichVu,
      { tenDichVu, anhDichVu, giaDichVu },
      { new: true }
    );
    res.status(200).json(updatedDichVu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật dịch vụ" });
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
}
