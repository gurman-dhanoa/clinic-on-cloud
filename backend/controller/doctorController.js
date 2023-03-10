const Doctor = require("../model/doctorModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Get all doctors
exports.getAllDoctors = catchAsyncError(async (req, res,next) => {
  const doctors = await Doctor.find();
  res.status(200).json({
    success: true,
    "Total doctors": doctors.length,
    doctors,
  });
});

// Create new doctor
exports.createNewDoctor = catchAsyncError(async (req, res,next) => {
  const newDoctor = await Doctor.create(req.body);
  res.status(200).json({
    success: true,
    newDoctor,
  });
});

// Update doctor profile
exports.updateProfile = catchAsyncError(async (req, res,next) => {
  let doctor = await Doctor.findById(req.params.id);
  
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found",404));
  }

  const newDoctor = await Doctor.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: "true",
    newDoctor
  })
});

// Delete doctor
exports.deleteDoctor = catchAsyncError(async(req,res,next) => {
  let doctor = await Doctor.findById(req.params.id);
  
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found",404));
  }

  await doctor.remove();

  res.status(200).json({
    success:"true",
    message:"doctor deleted successfully"
  })
});

// get doctor details
exports.getDoctorDetails = catchAsyncError(async(req,res,next) => {
  let doctor = await Doctor.findById(req.params.id);
  
  if (!doctor) {
    return next(new ErrorHandler("Doctor not found",404));
  }

  res.status(200).json({
    success:"true",
    doctor
  })
});
