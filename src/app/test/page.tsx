"use client";

import { useState } from "react";
import { Questions, Question } from "../data/questions";
import { questions } from "../data/questions";

export default function QuizTestPage() {
  const [gameState, setGameState] = useState("prep"); // 게임 상태 ("prep", "inProgress", "finished")
  const [selectedCategory, setSelectedCategory] =
    useState<keyof Questions>("algorithm"); // 기본값으로 algorithm 선택
  const [filteredQuestions, setSelectedQuestions] = useState<Question[]>(
    questions[selectedCategory]
  );
  const [currentQuestion, setCurrentQuestion] = useState(0); // 현재 문제 번호
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // 선택한 답
  const [correctAnswers, setCorrectAnswers] = useState(0); // 정답 개수

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value as keyof Questions;
    setSelectedCategory(selectedCategory);
    setSelectedQuestions(questions[selectedCategory]); // 선택된 카테고리의 질문들로 업데이트
  };
  const handleStart = () => {
    setGameState("inProgress");
  };
  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === filteredQuestions[currentQuestion].answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setGameState("finished");
    }
  };

  const handleRestart = () => {
    setSelectedCategory("algorithm");
    setCurrentQuestion(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setGameState("prep");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 pb-25">
      {gameState === "prep" && (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">퀘스트를 선택하세요</h2>
          <div className="space-y-4 flex flex-col">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {["algorithm", "network", "database"].map((ctg) => (
                <option key={ctg} value={ctg}>
                  {ctg === "algorithm" && "알고리즘"}
                  {ctg === "network" && "네트워크"}
                  {ctg === "database" && "데이터베이스"}
                </option>
              ))}
            </select>

            <button
              className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-102 hover:from-blue-600 hover:to-blue-800 focus:outline-none"
              onClick={handleStart}
            >
              시작
            </button>
          </div>
        </div>
      )}

      {gameState === "inProgress" && selectedCategory && (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            {filteredQuestions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {filteredQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`w-full p-3 rounded-lg border transition ${
                  selectedOption === index
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-50 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            {currentQuestion < filteredQuestions.length - 1
              ? "다음 문제"
              : "게임 종료"}
          </button>
          <div className="mt-4 text-center text-sm text-gray-600">
            {currentQuestion + 1} / {filteredQuestions.length}
          </div>
        </div>
      )}

      {gameState === "finished" && (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">게임 종료</h2>
          <h3 className="text-xl font-bold mb-4">
            {correctAnswers === filteredQuestions.length
              ? "합격했습니다"
              : "합격하지 못했습니다."}
          </h3>
          <p className="text-center">
            정답 개수: {correctAnswers} / {filteredQuestions.length}
          </p>
          <button
            onClick={handleRestart}
            className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
          >
            재도전
          </button>
        </div>
      )}
    </div>
  );
}
