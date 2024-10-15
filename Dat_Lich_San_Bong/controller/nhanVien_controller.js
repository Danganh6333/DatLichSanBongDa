const { NhanVienModel } = require("../model/nhanVien_model");
const mongoose = require("mongoose");
const COMMON = require("../COMMON");

exports.getListStaff = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const NhanViens = await NhanVienModel.find()
      .populate("id_NguoiDung")
      .populate("id_CaLamViec")
      .sort({ createdAt: -1 });
    console.log(NhanViens);

    res.status(200).json(NhanViens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách nhan vien" });
  }
};

exports.addStaff = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const { id_NguoiDung, id_CaLamViec, NgayVaoLam, NgayThoiLam } = req.body;
    
    const newNhanVien = new NhanVienModel({
        id_NguoiDung,
        id_CaLamViec,
        NgayVaoLam,
        NgayThoiLam
    })

    const savedNhanVien = await newNhanVien.save()
    res.status(201).json(savedNhanVien);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm nhân viên" });
  }
};

exports.updateStaff = async (req, res, next) => { 
    try {
        await mongoose.connect(COMMON.uri);
    } catch (error) {
        
    }
}

exports.deleteStaff = async (req, res, next) => { 
    
}