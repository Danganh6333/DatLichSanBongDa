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
      currentRoute: `/caLamViec`,
    };
    const data = await CaLamViecModel.find();
    res.render("chuSan/ca", { locals, layout: chuSanLayout, data });
  } catch (error) {
    console.log(error);
  }
};

exports.addShift = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { tenCa, tongTien } = req.body;
    const gioBatDau = req.body.gioBatDau.slice(0, 5);
    const gioKetThuc = req.body.gioKetThuc.slice(0, 5);

    const newCaLamViec = new CaLamViecModel({
      tenCa,
      gioBatDau,
      gioKetThuc,
      tongTien,
    });
    await newCaLamViec.save();

    res.redirect("/chuSan/caLamViec");
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

    const { tenCa, tongTien } = req.body;
    const gioBatDau = req.body.gioBatDau.slice(0, 5);
    const gioKetThuc = req.body.gioKetThuc.slice(0, 5);

    await CaLamViecModel.findByIdAndUpdate(
      id_CalamViec,
      { tenCa, tongTien, gioBatDau, gioKetThuc },
      { new: true }
    );
    res.redirect("/chuSan/caLamViec");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật ca làm việc" });
  }
};

exports.deleteShift = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const id_CaLamViec = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id_CaLamViec)) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    await CaLamViecModel.findByIdAndDelete(id_CaLamViec);

    res.redirect("/chuSan/caLamViec");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi cập nhật xóa làm việc" });
  }
};
