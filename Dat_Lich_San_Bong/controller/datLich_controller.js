const { DatLichModel } = require("../model/datLich_model");
const mongoose = require("mongoose");
const COMMON = require("../COMMON");

exports.getListBookings = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const DatLichs = await DatLichModel.find()
      .populate("id_NguoiDung")
      .populate("id_SanBong")
      .sort({ createdAt: -1 });
    console.log(DatLichs);

    res.status(200).json(DatLichs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách đặt lịch" });
  }
};

exports.addBooking = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);
    const {
      id_NguoiDung,
      id_SanBong,
      ngayDatLich,
      ngayBatDau,
      ngayKetThuc,
      trangThai,
      tongTien,
    } = req.body;

    const newDatLich = new DatLichModel({
      id_NguoiDung,
      id_SanBong,
      ngayDatLich,
      ngayBatDau,
      ngayKetThuc,
      trangThai,
      tongTien,
    });

    const savedDatLich = await newDatLich.save();

    res.status(201).json(savedDatLich);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi đặt lịch" });
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    await mongoose.connect(COMMON.uri);

    const id_DatLich = req.params.id;

    const {
      id_NguoiDung,
      id_SanBong,
      ngayDatLich,
      ngayBatDau,
      ngayKetThuc,
      trangThai,
      tongTien,
    } = req.body;

    const updatedDatLichStatus = await DatLichModel.findByIdAndUpdate(
      id_DatLich,
      {trangThai},
      {new : true}
    );

    res.status(200).json(updatedDatLichStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi sửa lịch" });
  }
};
