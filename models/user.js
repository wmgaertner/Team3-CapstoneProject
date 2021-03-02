var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");
var UserSchema=mongoose.Schema({
    username: String,
    isVerified: { type: Boolean, default: false },
});

UserSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", UserSchema, 'users');