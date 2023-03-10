const express = require("express");
const { getAllDoctors, createNewDoctor, updateProfile, deleteDoctor, getDoctorDetails } = require("../controller/doctorController");

const router = express.Router();

router.route("/doctors").get(getAllDoctors);
router.route("/doctor/new").post(createNewDoctor);
router.route("/doctor/:id").put(updateProfile).delete(deleteDoctor).get(getDoctorDetails);


module.exports = router;