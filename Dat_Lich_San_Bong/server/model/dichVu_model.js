const db = require('../config/db')

const DichVuSchema = new db.Schema(
  {
    tenDichVu : {
      type : String,
      required : true
    },
    anhDichVu : {
      type : String,
      required : true
    },
    giaDichVu : {
      type : Number,
      required : true
    }
  },
  {
    collection : 'dichVus'
  }
);

const DichVuModel = db.model("DichVuModel",DichVuSchema);
module.exports = {DichVuModel}

