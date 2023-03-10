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
    status:{
        // requested   fixed     completed
        type:String,
        required:[true,"Enter status of appointment"]
    },
    prescription:[{
        type:String
    }],
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