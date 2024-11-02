const express = require("express");
const router = express.Router();


/**
 * GET/
 * Starter page
 */

router.get("",async(req,res)=>{
    try {
        const locals = {
            title: "Trang Chủ",
            description:
              "Website đặt sân bóng dễ dàng và nhanh chóng, cung cấp dịch vụ đặt lịch, thanh toán trực tuyến, và hỗ trợ quản lý sân cho chủ sở hữu.",
          };
    res.render('index',{locals})
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;