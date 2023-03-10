const express = require("express");
const ErrorHandler = require("./middleware/ErrorHandler");

const app = express();
app.use(express.json());

// importing routes
const doctorRoutes = require("./routes/doctorRoute");
const userRoutes = require("./routes/userRoute");
const appointmentRoute = require("./routes/appointmentRoute");

app.use("/api/v1",doctorRoutes);
app.use("/api/v1",userRoutes);
app.use("/api/v1",appointmentRoute);

// using middleware
app.use(ErrorHandler);

module.exports = app;