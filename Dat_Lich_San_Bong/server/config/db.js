const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("đã kết nối thành công");
  })
  .catch((err) => {
    console.error("lỗi kết nối " + err);
  });

module.exports = mongoose;