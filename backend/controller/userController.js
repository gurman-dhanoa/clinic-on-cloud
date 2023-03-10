const User = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create new user
exports.createUser = catchAsyncError(async (req,res,next) => {
    const newUser = await User.create(req.body);
    res.status(200).json({
        success: true,
        newUser,
    });
});

// get All users
exports.getAllUser = catchAsyncError(async (req,res,next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        "Total users": users.length,
        users,
    });
});