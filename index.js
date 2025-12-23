const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/imageAnalysisRouter");
const ImageGenerator = require("./routes/createPhotoRouter");
const ingredientsRouter = require("./routes/ingredientRecognitionRouter");

const app = express();
const PORT = process.env.PORT || 999;

app.use(cors());
app.use(express.json());

app.use("/analyze", uploadRoutes);
app.use("/image", ImageGenerator);
app.use("/recognition", ingredientsRouter);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
