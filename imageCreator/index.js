const { InferenceClient } = require("@huggingface/inference");

const ImageCreator = async (req, res) => {
  const client = new InferenceClient(process.env.HF_TOKEN);

  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Prompt is required!" });
  try {
    const result = await client.textToImage({
      provider: "nebius",
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
      parameters: { num_inference_steps: 5 },
    });

    const buffer = Buffer.from(await result.arrayBuffer());
    const base64Image = buffer.toString("base64");

    res.status(200).json({
      success: true,
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to Generate Image" });
  }
};

module.exports = ImageCreator;
