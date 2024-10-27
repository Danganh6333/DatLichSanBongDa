const db = require( "../config/db" )

const TheLoaiSchema = new db.Schema({
    tenTheLoai : {
        type: String,
        required : true
    },
    anhTheLoai : {
        type : String,
        required : true
    }
},{
    collection: 'theLoais'
})

const TheLoaiModel = db.model("TheLoaiModel",TheLoaiSchema)
module.exports = {TheLoaiModel}