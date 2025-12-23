const express = require("express");
const ImageCreator = require("../imageCreator");

const ImageGenerator = express.Router();

ImageGenerator.post("/", ImageCreator);

module.exports = ImageGenerator;
