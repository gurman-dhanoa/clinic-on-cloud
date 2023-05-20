const Appointment = require("../model/appointmentModel");
const User = require("../model/userModel");
const Doctor = require("../model/doctorModel");
const cloudinary = require("cloudinary");

const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

// all appointment Admin -- Done
// Create -- Done
// Time allocation
// prescription update
// cancel appointment -- Done
// doctor pending appointment -- Done
// user pending appointment -- Done
// user completed appointments
// appointment details -- Done

// get all appointments -Admin
exports.getAllAppointments = catchAsyncError(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    "Total appointments": appointments.length,
    appointments,
  });
});

// Create new appointment
exports.createAppointment = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user);

  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return next(new ErrorHandler("doctor not exist", 404));
  }

  const { date, comment,prescription } = req.body;

  const appointment = await Appointment.create({
    doctorId: doctor._id,
    userId: user._id,
    doctorName: doctor.name,
    userName: user.name,
    date,
    comment,
    status: "PENDING",
  });

  res.status(200).json({
    success: true,
    appointment,
  });
});

// Get appointment details -- User
exports.getAppointmentDetailsUser = catchAsyncError(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHandler("appointment not exist", 404));
  }
  const user = await User.findById(appointment.userId);

  if (appointment.userId.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You cannot access this resourse", 404));
  }

  const doctor = await Doctor.findById(appointment.doctorId);

  res.status(200).json({
    success: true,
    doctor,
    user,
    appointment,
  });
});

// Get appointment details -- Doctor
exports.getAppointmentDetailsDoctor = catchAsyncError(
  async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return next(new ErrorHandler("appointment not exist", 404));
    }
    if (appointment.doctorId.toString() != req.doctor._id.toString()) {
      return next(new ErrorHandler("You cannot access this resourse", 404));
    }
    const doctor = await Doctor.findById(appointment.doctorId);
    const user = await User.findById(appointment.userId);

    res.status(200).json({
      success: true,
      doctor,
      user,
      appointment,
    });
  }
);

// get pending appointments of patient or coming appointments
exports.getUserPendingAppointments = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) {
    return next(new ErrorHandler("user not exist", 404));
  }

  const appointments = await Appointment.find({ userId: req.user });
  res.status(200).json({
    success: true,
    "Total appointments": appointments.length,
    appointments,
  });
});

// get completed appointments of patient OR previous medical history  // both can access but when logged in
exports.getUserCompletedAppointments = catchAsyncError(
  async (req, res, next) => {
    const user = await User.findById(req.user);
    if (!user) {
      return next(new ErrorHandler("user not exist", 404));
    }

    const appointments = await Appointment.find({
      userId: req.user,
      status: "COMPLETED",
    });
    res.status(200).json({
      success: true,
      "Total appointments": appointments.length,
      appointments,
    });
  }
);

// Cancel Appointment
exports.deleteAppointment = catchAsyncError(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  if (appointment.userId.toString() != req.user._id.toString()) {
    return next(new ErrorHandler("You cannot access this resourse", 404));
  }
  await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: "CANCEL" },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: "true",
    message: "appointment cancelled successfully",
  });
});

// get pending appointments of doctor
exports.getDoctorPendingAppointments = catchAsyncError(
  async (req, res, next) => {
    const doctor = await Doctor.findById(req.doctor);
    if (!doctor) {
      return next(new ErrorHandler("Doctor not exist", 404));
    }
    const appointments = await Appointment.find({ doctorId: req.doctor });
    res.status(200).json({
      success: true,
      "Total appointments": appointments.length,
      appointments,
    });
  }
);

// get completed appointments of doctor
exports.getDoctorCompletedAppointments = catchAsyncError(
  async (req, res, next) => {
    const doctor = await Doctor.findById(req.doctor);
    if (!doctor) {
      return next(new ErrorHandler("Doctor not exist", 404));
    }
    const appointments = await Appointment.find({
      doctorId: req.doctor,
      status: "COMPLETED",
    });
    res.status(200).json({
      success: true,
      "Total appointments": appointments.length,
      appointments,
    });
  }
);

// Update appointment
exports.updateappointment = catchAsyncError(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 404));
  }
  if (appointment.doctorId.toString() != req.doctor._id.toString()) {
    return next(new ErrorHandler("You cannot access this resourse", 404));
  }

  const newAppData = {};

  if (req.body.images !== "") {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newAppData.prescription = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  if (req.body.status !== "") {
    newAppData.status = req.body.status;
  }
  if (req.body.date !== "") {
    newAppData.date = req.body.date;
  }
  const newAppointment = await Appointment.findByIdAndUpdate(req.params.id,newAppData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: "true",
    newAppointment,
  });
});
