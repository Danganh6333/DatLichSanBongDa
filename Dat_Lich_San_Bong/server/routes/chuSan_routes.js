const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {} = require("../controller/nguoiDung_controller");

const chuSanLayout = "../views/layouts/chuSan" 

router.get("/chuSan/nhanVien", authenticate, authorize("admin"),async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
            userName: req.user.hoTen,
            currentRoute: `/chuSan`
            };

    res.render('chuSan/nguoiDung',{locals,layout : chuSanLayout})
    } catch (error) {
        console.log(error);
    }
})

router.get("/chuSan/ca", authenticate, authorize("admin"),async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
            userName: req.user.hoTen,
            currentRoute: `/ca`
            };

    res.render('chuSan/ca',{locals,layout : chuSanLayout})
    } catch (error) {
        console.log(error);
    }
})

router.get("/chuSan/doThue", authenticate, authorize("admin"),async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
            userName: req.user.hoTen,
            currentRoute: `/doThue`
            };

    res.render('chuSan/doThue',{locals,layout : chuSanLayout})
    } catch (error) {
        console.log(error);
    }
})
router.get("/chuSan/giaoCa", authenticate, authorize("admin"),async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
            userName: req.user.hoTen,
            currentRoute: `/giaoCa`
            };

    res.render('chuSan/giaoCa',{locals,layout : chuSanLayout})
    } catch (error) {
        console.log(error);
    }
})
router.get("/chuSan/nuocUong", authenticate, authorize("admin"),async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
            userName: req.user.hoTen,
            currentRoute: `/nuocUong`
            };

    res.render('chuSan/nuocUong',{locals,layout : chuSanLayout})
    } catch (error) {
        console.log(error);
    }
})
router.get("/chuSan/sanBong", authenticate, authorize("admin"),async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
            userName: req.user.hoTen,
            currentRoute: `/sanBong`            
            };

    res.render('chuSan/sanBong',{locals,layout : chuSanLayout})
    } catch (error) {
        console.log(error);
    }
})
router.get("/chuSan/thongKe", authenticate, authorize("admin"),async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
            userName: req.user.hoTen,
            currentRoute: `/thongKe`
            };

    res.render('chuSan/thongKe',{locals,layout : chuSanLayout})
    } catch (error) {
        console.log(error);
    }
})


module.exports = router