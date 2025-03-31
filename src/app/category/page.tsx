"use client";

import { useState } from "react";
import { Questions, Question } from "../data/questions";
import { questions } from "../data/questions";

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof Questions>("algorithm"); // 기본값으로 algorithm 선택
  const [filteredQuestions, setSelectedQuestions] = useState<Question[]>(
    questions[selectedCategory]
  );
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    new Array(filteredQuestions.length).fill(null) // 모든 질문에 대해 선택된 옵션 초기화
  );
  const [isAnswered, setIsAnswered] = useState<boolean[]>( // 각 질문에 대해 정답 확인 여부를 관리
    new Array(filteredQuestions.length).fill(false)
  );
  const [showAnswer, setShowAnswer] = useState<boolean[]>(
    Array(questions[selectedCategory].length).fill(false)
  ); // 정답 표시 상태

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value as keyof Questions;
    setSelectedCategory(selectedCategory);
    setSelectedQuestions(questions[selectedCategory]); // 선택된 카테고리의 질문들로 업데이트
    setSelectedOptions(
      new Array(questions[selectedCategory].length).fill(null)
    ); // 새로운 카테고리로 상태 리셋
    setIsAnswered(new Array(questions[selectedCategory].length).fill(false)); // 정답 확인 상태 리셋
    setShowAnswer(Array(questions[selectedCategory].length).fill(false)); // 정답 표시 초기화
  };

  // 정답 옵션 선택
  const handleOptionClick = (index: number, optionIndex: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = optionIndex;
    setSelectedOptions(updatedOptions);

    // "정답 확인" 버튼을 활성화 상태로 설정
    const newAnsweredState = [...isAnswered];
    newAnsweredState[index] = false;
    setIsAnswered(newAnsweredState);

    // 옵션 선택 시 정답 비활성화
    const newShowAnswerState = [...showAnswer];
    newShowAnswerState[index] = false;
    setShowAnswer(newShowAnswerState);
  };

  // 정답 확인
  const handleAnswerCheck = (index: number) => {
    const updatedIsAnswered = [...isAnswered];
    updatedIsAnswered[index] = true;
    setIsAnswered(updatedIsAnswered);

    // "정답 확인" 버튼 클릭 시 정답 보여주기
    const newShowAnswerState = [...showAnswer];
    newShowAnswerState[index] = true;
    setShowAnswer(newShowAnswerState);
  };

  const handleRestart = () => {
    setSelectedOptions(new Array(filteredQuestions.length).fill(null)); // 선택된 옵션 초기화
    setIsAnswered(new Array(filteredQuestions.length).fill(false)); // 정답 확인 상태 초기화
    setShowAnswer(Array(questions[selectedCategory].length).fill(false)); // 정답 표시 초기화
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 pb-25">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold ">카테고리 선택</h2>
          <button
            onClick={handleRestart}
            className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          >
            재도전
          </button>
        </div>
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
        </div>
      </div>

      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          {selectedCategory === "algorithm"
            ? "알고리즘 문제"
            : selectedCategory === "network"
            ? "네트워크 문제"
            : "데이터베이스 문제"}
        </h2>

        <div className="space-y-6">
          {filteredQuestions.map((question, index) => (
            <div key={index} className="pb-8">
              <h3 className="text-lg font-semibold pb-3">{question.question}</h3>
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleOptionClick(index, optionIndex)}
                    className={`w-full p-3 rounded-lg border transition ${
                      selectedOptions[index] === optionIndex
                        ? // 선택된 옵션만 강조
                          showAnswer[index]
                          ? selectedOptions[index] === question.answer // isAnswered[index]
                            ? "bg-green-200 border-green-500 text-green-800" // 정답일 때 (초록색)
                            : "bg-red-200 border-red-500 text-red-800" // 틀렸을 때 (빨간색)
                          : "bg-blue-200 border-blue-500 text-blue-800" // 답변 확인 안함 (파란색)
                        : "bg-gray-50 border-gray-300 hover:bg-gray-200" // 선택되지 않은 옵션 (기본)
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleAnswerCheck(index)}
                disabled={selectedOptions[index] === null}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                정답 확인
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
