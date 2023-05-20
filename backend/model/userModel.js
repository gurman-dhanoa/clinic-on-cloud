const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        minLength:[5,"Your name should contain min 5 character"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    height:{
        type:String,
        required:[true,"Please enter yuor qualification"]
    },
    gender:{
        type:String,
        required:[true,"Please enter your Gender"]
    },
    age:{
        type:Number,
        required:[true,"Please enter your age"]
    },
    weight:{
        type:Number,
        required:[true,"Please enter your Experience"]
    },
    location:{
        type:String,
        required:[true,"Please enter location of your clinic"]
    },
    contactNumber:[{
        type:Number,
        maxLength:[10,"Contact number can have max 10 character"],
        required:[true,"Please enter your contact number"]
    }],
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    adharCard_number:{
        type:Number,
        required:[true,"Please enter your adhar card number"],
        maxLength:[12,"max length of adhar card number is 12"]
    },

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // JWT TOKEN
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // Compare Password
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model("User",userSchema);