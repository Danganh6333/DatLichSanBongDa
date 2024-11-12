const { DatLichModel } = require("../model/datLich_model");
const mongoose = require("mongoose");
const { CaLamViecModel } = require("../model/caLamViec_model");
const { SanBongModel } = require("../model/sanBong_model");

const khachHangLayout = "../views/layouts/khachHang";

exports.getListBookings = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
      userName: req.user.hoTen,
      userId: req.user.id,
      currentRoute: `/khachHang`,
    };
    const data = await DatLichModel.find({ id_NguoiDung: req.user.id })
      .populate("id_NguoiDung")
      .populate("id_SanBong")
      .sort({ createdAt: -1 });

    const caLamViecs = await CaLamViecModel.find({ trangThai: 'Hoạt Động' }).sort({ createdAt: -1 });
    const sanBongs = await SanBongModel.find({ trangThai: 'Đang Dùng' }).sort({ createdAt: -1 });
    res.render("khachHang/datSan", {
      locals,
      layout: khachHangLayout,
      data,
      caLamViecs,
      sanBongs,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addBooking = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
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
    await mongoose.connect(process.env.MONGO_URI);

    const id_DatLich = req.params.id;

    const { trangThai } = req.body;

    const updatedDatLichStatus = await DatLichModel.findByIdAndUpdate(
      id_DatLich,
      { trangThai },
      { new: true }
    );

    res.status(200).json(updatedDatLichStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi sửa lịch" });
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_Lich = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_Lich)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    await DatLichModel.findByIdAndDelete(id_Lich);
    res.redirect("/chuSan/nhanVien");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi đặt lịch" });
  }
};
