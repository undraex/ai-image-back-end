const { InferenceClients } = require("huggingface/inference");

const client = new InferenceClients(process.env.HF_TOKEN);

module.exports = client;
