const mongoose = require("mongoose");
const COMMON = require("../COMMON");
mongoose
  .connect(COMMON.uri)
  .then(() => {
    console.log("đã kết nối thành công");
  })
  .catch((err) => {
    console.error("lỗi kết nối " + err);
  });

module.exports = mongoose;
