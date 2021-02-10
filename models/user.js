var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");
var UserSchema=mongoose.Schema({
    firstname: String,
    lastname: String,
    sex: String,
    age: Number,
    weight: Number,
    height: Number,
    bmi: Number,
    glucoselevel: Number,
    insulinlevel: Number,
    yearofdiagnosis: Number,
    diabetestype: String,
    email: String,
    username: String
});

UserSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", UserSchema);