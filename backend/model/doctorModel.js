const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = mongoose.Schema({
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
    qualification:{
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
    experience:{
        type:String,
        required:[true,"Please enter your Experience"]
    },
    location:{
        type:String,
        required:[true,"Please enter location of your clinic"]
    },
    fees:{
        type:Number,
        required:[true,"Please enter your Appointment fees"]
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
    rating:{
        type:Number,
        default:0
    },
    reviews:[{
        rating:{
            type:Number,
            required:[true,"Please give rating"]
        },
        reviews:{
            type:String,
            required:[true,"Please give your review"]
        }
    }],
    current_status:{
        type:Boolean,
        required:[true,"Please enter your available status"]
    },
    adharCard_number:{
        type:Number,
        required:[true,"Please enter your adhar card number"],
        maxLength:[12,"max length of adhar card number is 12"]
    }

});

module.exports = mongoose.model("Doctor",doctorSchema);