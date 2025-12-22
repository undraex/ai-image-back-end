const express = require("express");
const router = express.Router();
const { upload } = require("../multerConfig");
const { InferenceClient } = require("@huggingface/inference");
require("dotenv").config();

const client = new InferenceClient(process.env.HF_TOKEN);

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const PORT = process.env.PORT || 999;
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    // const chatCompletion = await client.chatCompletion({
    //   model: "Qwen/Qwen3-VL-30B-A3B-Instruct:novita",
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         {
    //           type: "text",
    //           text: "Describe this image in one sentence.",
    //         },
    //         {
    //           type: "image_url",
    //           image_url: {
    //             url: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // });

    const chatCompletion = await client.chatCompletion({
      model: "Qwen/Qwen3-VL-30B-A3B-Instruct:novita",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in one sentence.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl, // 🔥 ЭНЭ ХАМГИЙН ЧУХАЛ
              },
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      imageUrl,
      description: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
