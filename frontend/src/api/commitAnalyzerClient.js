import axios from "axios";

const commitAnalyzerClient = axios.create({
  baseURL: "https://commit-analyzer-mlsc.azurewebsites.net",
});

export default commitAnalyzerClient;
