const express = require("express");
const identifyIngredientsFromText = require("../ingredientRecognition");

const ingredientsRouter = express.Router();

ingredientsRouter.post("/", identifyIngredientsFromText);

module.exports = ingredientsRouter;
