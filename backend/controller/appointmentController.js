const Appointment = require("../model/appointmentModel");
const User = require("../model/userModel");
const Doctor = require("../model/doctorModel");

const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/ErrorHandler");

const userId = "640ab6a27a94d4770241e230";

exports.createAppointment = catchAsyncError(async(req,res,next) => {
    const user = await User.findById(userId);

    const doctor = await Doctor.findById(req.params.id);
    if(!doctor){
        return next(new ErrorHandler("doctor not exist",404));
    }

    const {date,status} = req.body;

    const appointment = await Appointment.create({
        doctorId: doctor._id,
        userId: userId,
        date,
        status
    });

    res.status(200).json({
        success:true,
        appointment
    })
})