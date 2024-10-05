const db = require("../config/db")

const NguoiDungSchema = new db.Schema({
    name: {
        type:String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },  
    role : {
        type: String,
        enum: ["user", "staff", "admin"],
        default : "user"
    },
    password:{
        type:String,
        required : true
    },
},{
    collection: 'nguoiDungs'
});

const NguoiDungModel = db.model("NguoiDungModel",NguoiDungSchema);
module.exports = { NguoiDungModel }

