const { CaLamViecModel } = require("../model/caLamViec_model");
const mongoose = require("mongoose");
const chuSanLayout = "../views/layouts/chuSan";

exports.getListShifts = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const locals = {
      title: "Trang Chủ",
      description:
        "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
      userName: req.user.hoTen,
      currentRoute: `/ca`,
    };
    const data = await CaLamViecModel.find()
      .populate("id_NhanVien")
      .sort({ createdAt: -1 });
    res.render("chuSan/ca", { locals, layout: chuSanLayout,data });
  } catch (error) {
    console.log(error);
  }
};

exports.addShift = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { id_NhanVien, gioBatDau, gioKetThuc, tongTien } = req.body;

    const newCaLamViec = new CaLamViecModel({
      id_NhanVien,
      gioBatDau,
      gioKetThuc,
      tongTien,
    });

    const savedCaLamViec = await newCaLamViec.save();

    res.status(201).json(savedCaLamViec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi thêm ca làm việc" });
  }
};

exports.updateShift = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_CalamViec = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_CalamViec)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const { id_NhanVien, gioBatDau, gioKetThuc, tongTien } = req.body;

    const updatedCaLamViec = await CaLamViecModel.findByIdAndUpdate(
      id_CalamViec,
      {
        id_NhanVien,
        tongTien,
      },
      { new: true }
    );
    res.status(200).json(updatedCaLamViec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật ca làm việc" });
  }
};

exports.deleteShift = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_CaLamViec = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_CalamViec)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const deletedCaLamViec = await CaLamViecModel.findByIdAndDelete(
      id_CaLamViec
    );

    res.status(200).json(deletedCaLamViec);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật xóa làm việc" });
  }
};
