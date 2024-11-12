const jwt = require("jsonwebtoken");
const { NguoiDungModel } = require("../model/nguoiDung_model");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) return res.status(401).json({ message: "Không có quyền truy cập." });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await NguoiDungModel.findById(decoded.id);
        req.user = { id: user._id, vaiTro: user.vaiTro, hoTen: user.hoTen }; 
        next();
    } catch (error) {
        res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
    }
};

const authorize = (role) => {
    return (req, res, next) => {
        console.log("User Role:", req.user.vaiTro);
        if (req.user.vaiTro !== role) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập vào trang này." });
        }
        next();
    };
};


  
module.exports = { authenticate, authorize};
