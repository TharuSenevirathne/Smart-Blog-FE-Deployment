import React, { useState } from "react";
import axios from "axios";

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/generate", {
        prompt
      });
      setOutput(res.data.output);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      ></textarea>

      <button onClick={handleGenerate}>Generate</button>

      <p>{output}</p>
    </div>
  );
}
