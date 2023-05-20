// Create Token and saving in cookie

exports.sendUserToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("userToken", token, options).json({
    success: true,
    user,
    token,
  });
};

exports.sendDocToken = (doctor, statusCode, res) => {
  const token = doctor.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("docToken", token, options).json({
    success: true,
    doctor,
    token,
  });
};
