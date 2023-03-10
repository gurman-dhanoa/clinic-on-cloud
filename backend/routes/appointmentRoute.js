const express = require("express");
const { createAppointment} = require("../controller/appointmentController");

const Router = express.Router();

Router.route("/appointment/new/:id").post(createAppointment);

module.exports = Router;