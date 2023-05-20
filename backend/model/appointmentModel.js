const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    doctorId:{
        type: mongoose.Types.ObjectId,
        ref:"Doctor"
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    doctorName:{
        type: String,
    },
    userName:{
        type: String,
    },
    comment:{
        type: String,
    },
    status:{
        // requested   fixed     completed
        type:String,
        required:[true,"Enter status of appointment"]
    },
    prescription:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    },
    disease:[{
        type:String
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    },
    date:{
        type:Date,
        default:Date.now()
    },
});

module.exports = mongoose.model("Appointment",appointmentSchema);