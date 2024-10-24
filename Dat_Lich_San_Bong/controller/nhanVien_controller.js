const { NhanVienModel } = require("../model/nhanVien_model");
const mongoose = require("mongoose");
const COMMON = require("../COMMON");

exports.getListStaffs = async (req, res, next) => {
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
      NgayThoiLam,
    });

    const savedNhanVien = await newNhanVien.save();
    res.status(201).json(savedNhanVien);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm nhân viên" });
  }
};

exports.updateStaff = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const id_NhanVien = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_NhanVien)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const { id_CaLamViec } = req.body;
    const updatedNhanVien = await NhanVienModel.findByIdAndUpdate(
      id_NhanVien,
      {
        id_CaLamViec,
      },
      { new: true }
    );
    
    res.status(200).json(updatedNhanVien);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật nhân viên" });
  }
};

exports.deleteStaff = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const id_NhanVien = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_NhanVien)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const deletedNhanVien = await NhanVienModel.findByIdAndDelete(id_NhanVien);
    res.status(200).json(deletedNhanVien);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy xóa nhân viên" });
  }
};
