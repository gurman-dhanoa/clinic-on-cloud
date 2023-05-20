const User = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { sendUserToken } = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

// Create new user
exports.createUser = catchAsyncError(async (req, res, next) => {
  const {
    name,
    email,
    password,
    gender,
    age,
    weight,
    height,
    location,
    contactNumber,
    adharCard_number,
  } = req.body;
  const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
    folder: "images",
    width: 150,
    crop: "scale",
  });
  const user = await User.create({
    name,
    email,
    password,
    gender,
    age,
    weight,
    height,
    location,
    contactNumber,
    adharCard_number,
    image: { public_id: myCloud.public_id, url: myCloud.secure_url },
  });
  sendUserToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendUserToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("userToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// get All users
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    "Total users": users.length,
    users,
  });
});

// Update user profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const newUser = await User.findByIdAndUpdate(req.user, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: "true",
    newUser,
  });
});

// Delete User
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  await user.remove();

  res.status(200).json({
    success: "true",
    message: "User deleted successfully",
  });
});

// get User details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: "true",
    user,
  });
});

// get User details
exports.getUserDetailsForDoctor = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: "true",
    user,
  });
});
