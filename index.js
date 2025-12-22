const express = require("express");
const cors = require("cors");
const path = require("path");
const { uploadDir } = require("./multerConfig");
const uploadRoutes = require("./routes/imageAnalysisRouter");

const app = express();
const PORT = process.env.PORT || 999;

app.use(cors());
app.use(express.json());

// app.use("/upload", express.static(uploadDir));
app.use("/upload", express.static("uploads"));
app.use("/", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
