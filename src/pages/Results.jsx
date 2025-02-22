import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveQuizResult, getQuizHistory, clearHistory } from "../utils/db";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 10 };
  const [history, setHistory] = useState([]);

  useEffect(() => {
    saveQuizResult(score, total); // Save result when component mounts
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getQuizHistory();
    setHistory(data);
  };

  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]); // Reset local state
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold">Quiz Completed!</h2>
      <p className="text-lg mt-4">Your Score: {score} / {total}</p>

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 px-6 py-2 rounded text-white hover:bg-blue-600"
      >
        Retry Quiz
      </button>

      {/* Show Quiz History */}
      <div className="mt-6 w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Previous Attempts</h3>
        {history.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {history.map((entry, index) => (
              <li key={index} className="text-gray-300 text-sm">
                📅 {new Date(entry.timestamp).toLocaleString()} - <strong>Score:</strong> {entry.score} / {entry.total}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-2">No past attempts.</p>
        )}

        {/* Clear History Button */}
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="mt-4 w-full bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  );
}

export default Results;
