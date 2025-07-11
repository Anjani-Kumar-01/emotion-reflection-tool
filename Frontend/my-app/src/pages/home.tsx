
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ emotion: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(false);


    if (!text.trim()) {
  setError(Error);
  setLoading(false);
  return;
}

    const response = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-5">How are you feeling today?</h1>
        <textarea
          className="w-full p-2 border rounded mb-5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Type  here.."
        />
        <button
          type="submit"
          className="bg-blue-600  hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

        {loading && <p className="mt-3 text-yellow-600">Analyzing...</p>}

        {result && (
          <div className="mt-5 p-4 bg-yellow-100 rounded">
            <p>Emotion: <strong>{result.emotion}</strong></p>
            <p>Confidence: <strong>{result.confidence}</strong></p>
          </div>
        )}
      </form>
    </div>
  );
}
