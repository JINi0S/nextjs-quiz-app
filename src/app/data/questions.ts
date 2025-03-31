export type Question = {
  question: string;
  options: string[];
  answer: number;
};

export type Questions = {
  algorithm: Question[];
  network: Question[];
  database: Question[];
};

export const questions: Questions = {
  algorithm: [
    {
      question: "다음 중 O(log n) 시간 복잡도를 가지는 알고리즘은?",
      options: ["이진 탐색", "버블 정렬", "퀵 정렬", "선택 정렬"],
      answer: 0, 
    },
    {
      question: "다음 중 그래프에서 DFS(깊이 우선 탐색)의 특징은?",
      options: [
        "너비 우선 탐색",
        "스택을 이용한 탐색",
        "큐를 이용한 탐색",
        "최단 경로를 구할 수 있다",
      ],
      answer: 1,
    },
  ],
  network: [
    {
      question: "TCP/IP에서 연결 지향적인 프로토콜은?",
      options: ["UDP", "HTTP", "TCP", "IP"],
      answer: 2,
    },
    {
      question: "웹 페이지를 방문할 때 사용자의 요청을 다른 서버로 전달하고, 응답을 받아 다시 사용자에게 보내는 역할을 하는 것은?",
      options: ["라우터", "스위치", "프록시 서버", "방화벽승"],
      answer: 0,
    },
  ],
  database: [
    {
      question: "관계형 데이터베이스에서 데이터베이스 스키마를 정의하는 것은?",
      options: ["테이블", "뷰", "인덱스", "제약 조건"],
      answer: 0,
    },
    {
      question: "SQL에서 데이터를 삭제하는 명령어는?",
      options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
      answer: 0,
    },
  ],
};
