const express = require("express");
const { getAllUser, createUser } = require("../controller/userController");

const Router = express.Router();

Router.route("/users").get(getAllUser);
Router.route("/user/new").post(createUser);

module.exports = Router;