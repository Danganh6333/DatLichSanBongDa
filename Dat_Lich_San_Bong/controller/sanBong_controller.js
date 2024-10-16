const { SanBongModel}  = require("../model/sanBong_model");
const mongoose = require("mongoose");
const COMMON = require('../COMMON')

exports.getListField = async (req, res, next) => {
    try {
        await mongoose.connect(COMMON.uri);
        const SanBongs = await SanBongModel.find().sort({ createdAt: -1 });
        console.log(SanBongs);

        res.status(200).json(SanBongs);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi lấy danh sách sân bóng" });
      }
};

exports.addField = async (req, res, next) => {
    try {
        await mongoose.connect(COMMON.uri);
        const { tenSan,diaDiem,giaTheoGio,trangThai } = req.body;

        const newSanBong= new SanBongModel({
            tenSan,
            diaDiem,
            giaTheoGio,
            trangThai 
        });
    
        const savedSanBong= await newSanBong.save();
    
        res.status(201).json(savedSanBong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi thêm sân bóng" });
    }
};

exports.updateField = async (req, res, next) => {
    try {
        await mongoose.connect(COMMON.uri);

        const id_SanBong = req.params.id;
        const { tenSan,diaDiem,giaTheoGio,trangThai } = req.body;

        const updatedSanBong= await SanBongModel.findByIdAndUpdate(
            id_SanBong ,
            {tenSan,giaTheoGio,trangThai},
            { new: true }
        );
    
        res.status(200).json(updatedSanBong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi cập nhật sân bóng" });
    }
};

exports.deleteField = async (req, res, next) => { 
    try {
        await mongoose.connect(COMMON.uri);
        const id_SanBong = req.params.id;

        const deletedSanBong = await SanBongModel.findByIdAndDelete(id_SanBong);
        res.status(200).json(deletedSanBong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi xóa sân bóng" });
    }
}


