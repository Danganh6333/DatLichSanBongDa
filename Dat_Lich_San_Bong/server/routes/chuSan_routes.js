const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");

const chuSanLayout = "../views/layouts/chuSan" 

router.get("/chuSan", authenticate, authorize("admin"),async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
            
            };

    res.render('chuSan/index',{locals,layout : chuSanLayout})
    } catch (error) {
        console.log(error);
    }
})



module.exports = router