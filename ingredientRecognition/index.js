const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

const identifyIngredientsFromText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }

    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content:
            "You are a food expert. Given a food name or description, list common ingredients as bullet points only.",
        },
        {
          role: "user",
          content: `
From the following text, extract ONLY the food ingredients.
Return the result as a comma separated list.
Text:
"${text}"
          `,
        },
      ],
    });

    res.json({
      ingredients: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ingredient identification failed" });
  }
};
module.exports = identifyIngredientsFromText;
