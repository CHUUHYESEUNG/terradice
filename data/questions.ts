export interface Question {
  id: number;
  category: string;
  question: string;
  emoji: string;
}

export const QUESTIONS: Question[] = [
  // Self-reflection / 자기 성찰
  {
    id: 1,
    category: 'categories.selfReflection',
    question: 'questions.q1',
    emoji: '🙏',
  },
  {
    id: 2,
    category: 'categories.selfReflection',
    question: 'questions.q2',
    emoji: '💭',
  },
  {
    id: 3,
    category: 'categories.selfReflection',
    question: 'questions.q3',
    emoji: '🎯',
  },
  {
    id: 4,
    category: 'categories.selfReflection',
    question: 'questions.q4',
    emoji: '😊',
  },
  {
    id: 5,
    category: 'categories.selfReflection',
    question: 'questions.q5',
    emoji: '💪',
  },

  // Past memories / 과거 회상
  {
    id: 6,
    category: 'categories.pastMemories',
    question: 'questions.q6',
    emoji: '🧸',
  },
  {
    id: 7,
    category: 'categories.pastMemories',
    question: 'questions.q7',
    emoji: '🔄',
  },
  {
    id: 8,
    category: 'categories.pastMemories',
    question: 'questions.q8',
    emoji: '⏮️',
  },
  {
    id: 9,
    category: 'categories.pastMemories',
    question: 'questions.q9',
    emoji: '✈️',
  },
  {
    id: 10,
    category: 'categories.pastMemories',
    question: 'questions.q10',
    emoji: '📚',
  },

  // Future imagination / 미래 상상
  {
    id: 11,
    category: 'categories.futureImagination',
    question: 'questions.q11',
    emoji: '🔮',
  },
  {
    id: 12,
    category: 'categories.futureImagination',
    question: 'questions.q12',
    emoji: '🌟',
  },
  {
    id: 13,
    category: 'categories.futureImagination',
    question: 'questions.q13',
    emoji: '🪣',
  },
  {
    id: 14,
    category: 'categories.futureImagination',
    question: 'questions.q14',
    emoji: '🚀',
  },
  {
    id: 15,
    category: 'categories.futureImagination',
    question: 'questions.q15',
    emoji: '🌅',
  },

  // Relationships / 관계
  {
    id: 16,
    category: 'categories.relationships',
    question: 'questions.q16',
    emoji: '💝',
  },
  {
    id: 17,
    category: 'categories.relationships',
    question: 'questions.q17',
    emoji: '📞',
  },
  {
    id: 18,
    category: 'categories.relationships',
    question: 'questions.q18',
    emoji: '💬',
  },
  {
    id: 19,
    category: 'categories.relationships',
    question: 'questions.q19',
    emoji: '👨‍👩‍👧‍👦',
  },
  {
    id: 20,
    category: 'categories.relationships',
    question: 'questions.q20',
    emoji: '🤝',
  },

  // Daily life / 일상
  {
    id: 21,
    category: 'categories.dailyLife',
    question: 'questions.q21',
    emoji: '📝',
  },
  {
    id: 22,
    category: 'categories.dailyLife',
    question: 'questions.q22',
    emoji: '🎨',
  },
  {
    id: 23,
    category: 'categories.dailyLife',
    question: 'questions.q23',
    emoji: '🍽️',
  },
  {
    id: 24,
    category: 'categories.dailyLife',
    question: 'questions.q24',
    emoji: '💫',
  },
  {
    id: 25,
    category: 'categories.dailyLife',
    question: 'questions.q25',
    emoji: '✨',
  },

  // Values / 가치관
  {
    id: 26,
    category: 'categories.values',
    question: 'questions.q26',
    emoji: '⚖️',
  },
  {
    id: 27,
    category: 'categories.values',
    question: 'questions.q27',
    emoji: '🏆',
  },
  {
    id: 28,
    category: 'categories.values',
    question: 'questions.q28',
    emoji: '😄',
  },
  {
    id: 29,
    category: 'categories.values',
    question: 'questions.q29',
    emoji: '💡',
  },
  {
    id: 30,
    category: 'categories.values',
    question: 'questions.q30',
    emoji: '⏰',
  },

  // Creative questions / 창의적 질문
  {
    id: 31,
    category: 'categories.creative',
    question: 'questions.q31',
    emoji: '🎨',
  },
  {
    id: 32,
    category: 'categories.creative',
    question: 'questions.q32',
    emoji: '🦋',
  },
  {
    id: 33,
    category: 'categories.creative',
    question: 'questions.q33',
    emoji: '⏱️',
  },
  {
    id: 34,
    category: 'categories.creative',
    question: 'questions.q34',
    emoji: '🦸',
  },
  {
    id: 35,
    category: 'categories.creative',
    question: 'questions.q35',
    emoji: '🎬',
  },

  // Challenge & growth / 도전과 성장
  {
    id: 36,
    category: 'categories.challengeGrowth',
    question: 'questions.q36',
    emoji: '🌱',
  },
  {
    id: 37,
    category: 'categories.challengeGrowth',
    question: 'questions.q37',
    emoji: '😰',
  },
  {
    id: 38,
    category: 'categories.challengeGrowth',
    question: 'questions.q38',
    emoji: '📖',
  },
  {
    id: 39,
    category: 'categories.challengeGrowth',
    question: 'questions.q39',
    emoji: '🎓',
  },
  {
    id: 40,
    category: 'categories.challengeGrowth',
    question: 'questions.q40',
    emoji: '🔓',
  },
];

export const getRandomQuestion = (): Question => {
  const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
  return QUESTIONS[randomIndex];
};

export const getQuestionById = (id: number): Question | undefined => {
  return QUESTIONS.find((q) => q.id === id);
};
