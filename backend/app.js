const express = require("express");
const ErrorHandler = require("./middleware/ErrorHandler");
const CookieParser = require("cookie-parser");
const fileupload = require('express-fileupload'); 

const app = express();
app.use(fileupload({useTempFiles: true}))
app.use(express.json());
app.use(CookieParser());

// importing routes
const doctorRoutes = require("./routes/doctorRoute");
const userRoutes = require("./routes/userRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const cookieParser = require("cookie-parser");

app.use("/api/v1", doctorRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", appointmentRoute);

// using middleware
app.use(ErrorHandler);

app.get("/", (req, res) => {
  res.send(
    `<h1 style="font-family:Garamond; width:100%; text-align:center; padding-top: 45vh;">Server is working fine, <a href="${process.env.FRONTEND_URL}" style="font-style: italic;">click here</a> to visit client side.</h1>`
  );
});

module.exports = app;
