const express = require("express");
const router = express.Router();
const { upload } = require("../multerConfig");

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const PORT = process.env.PORT || 999;
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
