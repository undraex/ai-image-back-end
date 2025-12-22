const { InferenceClients } = require("huggingface/inference");

const client = new InferenceClients("HF_TOKEN");

module.exports = client;
