const SanBongModel = require("../model/sanBong_model");
const mongoose = require("mongoose");

exports.getListField = async (req, res, next) => {
    try {
        await mongoose.connect(COMMON.uri);
        const newSanBong = await SanBongModel.find();
        console.log(newSanBong);

        res.status(200).json(newSanBong);

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
            {tenSan,diaDiem,giaTheoGio,trangThai},
            { new: true }
        );
    
        res.status(200).json(updatedSanBong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi cập nhật sân bóng" });
    }
};


