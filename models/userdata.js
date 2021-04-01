var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");
var UserDataSchema=mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    sex: String,
    age: Number,
    weight: Number,
    height: Number,
    bmi: Number,
    glucoselevels: [Number],
    timestamps: [String],
    carbs: [Number],
    insulinlevel: Number,
    yearofdiagnosis: Number,
    diabetic: Boolean,
});


module.exports = mongoose.model("UserData", UserDataSchema, 'userdata');