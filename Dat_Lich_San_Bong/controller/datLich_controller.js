const SanBongModel = require("../model/sanBong_model");
const mongoose = require("mongoose");

exports.addField = async (req, res, next) => {
    try {
        await mongoose.connect(COMMON.uri);
        const { id_NguoiDung, id_SanBong, ngayDatLich, ngayBatDau,ngayKetThuc,trangThai,tongTien } = req.body;

        const newSanBong= new SanBongModel({
            id_NguoiDung, 
            id_SanBong, 
            ngayDatLich, 
            ngayBatDau,
            ngayKetThuc,
            trangThai,
            tongTien
        });
    
        const savedSanBong= await newSanBong.save();
    
        res.status(201).json(savedSanBong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi thêm sân bóng" });
    }
};