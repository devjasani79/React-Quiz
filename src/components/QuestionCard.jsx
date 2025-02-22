function QuestionCard({ question, currentQuestion, totalQuestions, timeLeft, selectedAnswer, setSelectedAnswer }) {
    return (
      <>
        <h2 className="text-xl font-semibold text-gray-800">
          Question {currentQuestion + 1} / {totalQuestions}
        </h2>
        <p className="mt-4 text-gray-700">{question.question}</p>
  
        <p className={`mt-4 text-lg font-medium ${timeLeft <= 10 ? "text-red-500" : "text-gray-600"}`}>
          ⏳ Time Left: {timeLeft}s
        </p>
  
        {question.type === "mcq" ? (
          <div className="mt-4 space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`block w-full p-2 border rounded-md text-gray-800 ${
                  selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="number"
            className="mt-4 w-full p-2 border rounded-md"
            placeholder="Enter your answer"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
        )}
      </>
    );
  }
  
  export default QuestionCard;
  