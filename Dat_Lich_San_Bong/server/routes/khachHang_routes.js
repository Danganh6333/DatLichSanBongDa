const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");

const khachHangLayout = "../views/layouts/khachHang"

router.get("/khachHang", authenticate, authorize("user"), async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
              userName: req.user.hoTen,
              currentRoute: `/khachHang`
            };    
    res.render('khachHang/index',{locals,layout : khachHangLayout})
    } catch (error) {
        console.log(error);
    }
})

router.get("/datLich", authenticate, authorize("user"), async(req,res)=>{
    try {
        const locals = {
            title: "Đặt Lịch",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
              userName: req.user.hoTen,
              currentRoute: `/datLich`
            };    
    res.render('khachHang/datSan',{locals,layout : khachHangLayout})
    } catch (error) {
        console.log(error);
    }
})

router.get("/signOut", authenticate, authorize("user"), async(req,res)=>{
    try {
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;