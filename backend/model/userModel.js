const mongoose = require("mongoose");
const validator = require("validator");

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
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    adharCard_number:{
        type:Number,
        required:[true,"Please enter your adhar card number"],
        maxLength:[12,"max length of adhar card number is 12"]
    }

});

module.exports = mongoose.model("User",userSchema);