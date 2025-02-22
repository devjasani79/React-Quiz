import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import QuestionCard from "../components/QuestionCard";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion(); // Auto move to next question on timeout
    }
  }, [timeLeft]);

  const handleAnswerSubmit = () => {
    const currentQ = questions[currentQuestion];
    if (currentQ.type === "mcq" && selectedAnswer === currentQ.answer) {
      setScore(score + 1);
    } else if (currentQ.type === "integer" && parseInt(selectedAnswer) === currentQ.answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setTimeLeft(30);
    } else {
      navigate("/results", { state: { score, total: questions.length } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
        <QuestionCard
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />

        <button
          onClick={handleAnswerSubmit}
          className="mt-4 w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
          disabled={!selectedAnswer}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}

export default Quiz;
