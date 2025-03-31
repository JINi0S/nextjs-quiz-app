// 퀴즈 화면
"use client";

import { useState } from "react";

export default function QuizTestPage() {
  const questions = [
    {
      question: "Next.js에서 App Router의 주요 특징은?",
      options: ["Static Routing", "Dynamic Routing", "SSR 전용", "CSR 전용"],
      answer: 1, // 정답: "Dynamic Routing"
    },
    {
      question: "Tailwind CSS에서 flex 컨테이너를 만드는 클래스는?",
      options: ["grid", "flex", "block", "inline"],
      answer: 1, // 정답: "flex"
    },
    {
      question: "React에서 상태를 관리하는 Hook은?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      answer: 0, // 정답: "useState"
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [isAnswered, setIsAnswered] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );
  const [showAnswer, setShowAnswer] = useState<boolean[]>(
    Array(questions.length).fill(false)
  ); // 정답 표시 상태 추가

  const handleOptionClick = (qIndex: number, optionIndex: number) => {
    const newSelections = [...selectedOptions];
    newSelections[qIndex] = optionIndex;
    setSelectedOptions(newSelections);

    // "정답 확인" 버튼을 활성화 상태로 설정
    const newAnsweredState = [...isAnswered];
    newAnsweredState[qIndex] = false;
    setIsAnswered(newAnsweredState);

    // 옵션 선택 시 정답 비활성화
    const newShowAnswerState = [...showAnswer];
    newShowAnswerState[qIndex] = false;
    setShowAnswer(newShowAnswerState);
  };

  const handleSubmit = (qIndex: number) => {
    const newAnsweredState = [...isAnswered];
    newAnsweredState[qIndex] = true;
    setIsAnswered(newAnsweredState);

    // "정답 확인" 버튼 클릭 시 정답 보여주기
    const newShowAnswerState = [...showAnswer];
    newShowAnswerState[qIndex] = true;
    setShowAnswer(newShowAnswerState);
  };

  const handleReset = () => {
    setSelectedOptions(Array(questions.length).fill(null));
    setIsAnswered(Array(questions.length).fill(false)); // 정답 확인 상태 리셋
    setShowAnswer(Array(questions.length).fill(false)); // 정답 표시 초기화
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz</h2>

        <div className="space-y-8">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="w-full bg-white  rounded-2xl p-6"
            >
              {/* <div key={qIndex} className="p-4 bg-gray-50 rounded-lg shadow-sm"> */}
              <h3 className="text-lg font-semibold mb-3">{q.question}</h3>

              <div className="space-y-2">
                {q.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(qIndex, index)}
                    className={`w-full p-3 rounded-lg border transition ${
                      selectedOptions[qIndex] === index
                        ? "bg-blue-200 border-blue-500 text-gray-800"
                        : "bg-gray-50 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {selectedOptions[qIndex] !== null && !isAnswered[qIndex] && (
                <button
                  onClick={() => handleSubmit(qIndex)}
                  className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  정답 확인
                </button>
              )}

              {showAnswer[qIndex] && (
                <div className="mt-3 text-center">
                  {selectedOptions[qIndex] === q.answer ? (
                    <p className="text-green-600">정답입니다!</p>
                  ) : (
                    <p className="text-red-600">틀렸습니다!</p>
                    // <p className="text-red-600">틀렸습니다. 정답: {q.options[q.answer]}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleReset}
        className="mt-6 w-full max-w-2xl bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800"
      >
        테스트 종료
      </button>
    </div>
  );
}
