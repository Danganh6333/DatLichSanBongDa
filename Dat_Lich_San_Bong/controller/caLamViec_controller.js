const { CaLamViecModel } = require("../model/caLamViec_model");
const mongoose = require("mongoose");
const COMMON = require("../COMMON");

exports.getListShift = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const CaLamViecs = await CaLamViecModel.find()
      .populate("id_NhanVien")
      .sort({ createdAt: -1 });
    console.log(CaLamViecs);

    res.status(200).json(CaLamViecs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách ca làm việc" });
  }
};

exports.addShift = async (req, res, next) => { 
  try {
    await mongoose.connect(COMMON.uri);
    const {
      id_NhanVien,
      gioBatDau,
      gioKetThuc,
      tongTien
    } = req.body

    
    const newCaLamViec = new CaLamViecModel({
      id_NhanVien,
      gioBatDau,
      gioKetThuc,
      tongTien
    })

    const savedCaLamViec = await newCaLamViec.save();
    
    res.status(201).json(savedCaLamViec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm ca làm việc" });
  }
}

exports.updateShift = async (req, res, next) => { 
  try {
    
  } catch (error) {
    
  }
}

exports.deleteShift = async (req, res, next) => { 
  try {
    
  } catch (error) {
    
  }
}