//External modules
const express = require("express");

//Internall modules
const homeController = require("../controller/home");

const router = express.Router();

router.get("/", homeController.renderHomeTemplate);

module.exports = { router };
