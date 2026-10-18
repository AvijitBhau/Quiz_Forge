export const SUBJECTS = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'Literature',
  'Economics',
  'Psychology',
]

export const TOPIC_SUGGESTIONS = {
  'Computer Science': ['React Hooks', 'Big O Notation', 'SQL Joins', 'REST APIs', 'Binary Trees'],
  'Mathematics': ['Calculus Derivatives', 'Linear Algebra', 'Probability Theory', 'Number Theory'],
  'Physics': ['Quantum Mechanics', 'Thermodynamics', 'Electromagnetism', 'Special Relativity'],
  'Biology': ['Cell Biology', 'Genetics & DNA', 'Evolution', 'Human Anatomy'],
  'History': ['World War II', 'French Revolution', 'Ancient Rome', 'Cold War'],
  default: ['Machine Learning Basics', 'Climate Change', 'World Capitals', 'Periodic Table'],
}

export const MOCK_QUIZ_TEMPLATES = [
  {
    topic: 'React Hooks',
    subject: 'Computer Science',
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        text: 'Which hook is used to manage side effects in a functional React component?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctIndex: 1,
        explanation:
          'useEffect is designed for side effects such as data fetching, subscriptions, and manually changing the DOM.',
      },
      {
        id: 'q2',
        text: 'What does the dependency array in useEffect control?',
        options: [
          'The initial state value',
          'Which props the component receives',
          'When the effect re-runs',
          'The number of renders',
        ],
        correctIndex: 2,
        explanation:
          'The dependency array tells React to re-run the effect only when the specified values change.',
      },
      {
        id: 'q3',
        text: 'What is the return value of useState?',
        options: [
          'An object with state and setState',
          'A tuple of [state, setState]',
          'Only the current state value',
          'A promise resolving to state',
        ],
        correctIndex: 1,
        explanation:
          'useState returns an array with two elements: the current state value and a function to update it.',
      },
      {
        id: 'q4',
        text: 'Which hook would you use to avoid passing props through many levels of components?',
        options: ['useRef', 'useMemo', 'useContext', 'useCallback'],
        correctIndex: 2,
        explanation:
          'useContext lets you subscribe to React context without introducing nesting, solving prop-drilling.',
      },
      {
        id: 'q5',
        text: 'What does useCallback return?',
        options: [
          'A memoized value',
          'A memoized callback function',
          'A ref object',
          'The previous render value',
        ],
        correctIndex: 1,
        explanation:
          'useCallback returns a memoized version of the callback that only changes if dependencies change.',
      },
      {
        id: 'q6',
        text: 'When does useLayoutEffect fire compared to useEffect?',
        options: [
          'After the browser paints',
          'Before the browser paints, synchronously',
          'Only on the first render',
          'Only on re-renders',
        ],
        correctIndex: 1,
        explanation:
          'useLayoutEffect fires synchronously after DOM mutations but before the browser paints.',
      },
      {
        id: 'q7',
        text: 'What is the purpose of useRef?',
        options: [
          'To trigger re-renders on value change',
          'To persist a value across renders without causing re-renders',
          'To create memoized selectors',
          'To access context values',
        ],
        correctIndex: 1,
        explanation:
          'useRef returns a mutable ref object whose .current property persists for the full lifetime of the component without causing re-renders.',
      },
      {
        id: 'q8',
        text: 'Which hook is used for complex state logic with multiple sub-values?',
        options: ['useState', 'useContext', 'useReducer', 'useMemo'],
        correctIndex: 2,
        explanation:
          'useReducer is preferable to useState when state logic is complex or involves multiple sub-values.',
      },
      {
        id: 'q9',
        text: 'What does useMemo optimize?',
        options: [
          'Async operations',
          'DOM mutations',
          'Expensive computations by memoizing their result',
          'Event handlers',
        ],
        correctIndex: 2,
        explanation:
          'useMemo memoizes the result of an expensive computation, recalculating only when dependencies change.',
      },
      {
        id: 'q10',
        text: 'Can hooks be called conditionally inside a component?',
        options: [
          'Yes, anywhere in the component',
          'Yes, but only inside useEffect',
          'No — hooks must be called at the top level',
          'Only class-based hooks can be conditional',
        ],
        correctIndex: 2,
        explanation:
          'Rules of Hooks require that hooks are always called at the top level, never inside loops, conditions, or nested functions.',
      },
    ],
  },
  {
    topic: 'Big O Notation',
    subject: 'Computer Science',
    difficulty: 'hard',
    questions: [
      {
        id: 'q1',
        text: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctIndex: 1,
        explanation: 'Binary search halves the search space each iteration, giving O(log n) time complexity.',
      },
      {
        id: 'q2',
        text: 'What is the time complexity of quicksort in the average case?',
        options: ['O(n²)', 'O(n)', 'O(n log n)', 'O(log n)'],
        correctIndex: 2,
        explanation: 'Quicksort has an average-case complexity of O(n log n) due to recursive partitioning.',
      },
      {
        id: 'q3',
        text: 'Which data structure offers O(1) average-case lookup?',
        options: ['Array', 'Linked List', 'Hash Table', 'Binary Search Tree'],
        correctIndex: 2,
        explanation: 'Hash tables use hashing to achieve O(1) average-case time for lookups.',
      },
      {
        id: 'q4',
        text: 'What is the space complexity of merge sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctIndex: 2,
        explanation: 'Merge sort requires O(n) auxiliary space for the temporary arrays during merging.',
      },
      {
        id: 'q5',
        text: 'What is O(1) known as?',
        options: ['Linear time', 'Logarithmic time', 'Constant time', 'Quadratic time'],
        correctIndex: 2,
        explanation: 'O(1) means the operation takes a constant amount of time regardless of input size.',
      },
    ],
  },
  {
    topic: 'Quantum Mechanics',
    subject: 'Physics',
    difficulty: 'hard',
    questions: [
      {
        id: 'q1',
        text: "What does Heisenberg's Uncertainty Principle state?",
        options: [
          'Energy is always conserved',
          'You cannot simultaneously know the exact position and momentum of a particle',
          'Light behaves only as a wave',
          'All particles have integer spin',
        ],
        correctIndex: 1,
        explanation:
          'The Uncertainty Principle states that the more precisely position is known, the less precisely momentum can be known, and vice versa.',
      },
      {
        id: 'q2',
        text: "What is Schrödinger's Cat a thought experiment about?",
        options: [
          'Feline cognition',
          'Quantum superposition and observation',
          'Classical wave mechanics',
          'Relativistic mass increase',
        ],
        correctIndex: 1,
        explanation:
          "Schrödinger's Cat illustrates the paradox of quantum superposition — a cat in a box is both alive and dead until observed.",
      },
      {
        id: 'q3',
        text: 'What is quantum entanglement?',
        options: [
          'Particles colliding at high speed',
          'A phenomenon where particles share quantum states regardless of distance',
          'The splitting of an atom',
          'A measurement error in quantum systems',
        ],
        correctIndex: 1,
        explanation:
          'Entangled particles exhibit correlated quantum states — measuring one instantly determines the state of the other.',
      },
      {
        id: 'q4',
        text: 'What is a photon?',
        options: [
          'A unit of electrical charge',
          'A massive particle carrying the weak force',
          'A massless quantum of light',
          'A type of quark',
        ],
        correctIndex: 2,
        explanation:
          'A photon is a massless elementary particle that is the quantum of the electromagnetic field.',
      },
      {
        id: 'q5',
        text: 'What does wave-particle duality describe?',
        options: [
          'How waves travel through a vacuum',
          'The dual nature of quantum objects as both waves and particles',
          'The speed of sound vs light',
          'Interference patterns in classical physics',
        ],
        correctIndex: 1,
        explanation:
          'Wave-particle duality is the concept that quantum entities exhibit both wave-like and particle-like properties.',
      },
    ],
  },
  {
    topic: 'World War II',
    subject: 'History',
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        text: 'In which year did World War II begin?',
        options: ['1935', '1937', '1939', '1941'],
        correctIndex: 2,
        explanation: 'WWII began on September 1, 1939, when Germany invaded Poland.',
      },
      {
        id: 'q2',
        text: 'What was the code name for the Allied invasion of Normandy?',
        options: [
          'Operation Market Garden',
          'Operation Overlord',
          'Operation Barbarossa',
          'Operation Sea Lion',
        ],
        correctIndex: 1,
        explanation:
          'Operation Overlord was the code name for the Battle of Normandy, the largest seaborne invasion in history.',
      },
      {
        id: 'q3',
        text: 'Which countries formed the main Allied Powers?',
        options: [
          'Germany, Italy, Japan',
          'USA, UK, France, USSR',
          'Spain, Portugal, Turkey',
          'Austria, Hungary, Bulgaria',
        ],
        correctIndex: 1,
        explanation:
          'The main Allied Powers were the United States, United Kingdom, France, and the Soviet Union.',
      },
      {
        id: 'q4',
        text: 'What event brought the United States into WWII?',
        options: [
          'The fall of France',
          'The invasion of Poland',
          'The attack on Pearl Harbor',
          'The Battle of Britain',
        ],
        correctIndex: 2,
        explanation:
          "Japan's surprise attack on Pearl Harbor on December 7, 1941 prompted the US to declare war.",
      },
      {
        id: 'q5',
        text: 'When did WWII end in Europe (V-E Day)?',
        options: ['August 15, 1945', 'May 8, 1945', 'September 2, 1945', 'April 30, 1945'],
        correctIndex: 1,
        explanation:
          "Victory in Europe Day (V-E Day) was May 8, 1945, marking Germany's unconditional surrender.",
      },
      {
        id: 'q6',
        text: 'What were the atomic bombs dropped on Japan named?',
        options: [
          'Big Boy and Little Man',
          'Little Boy and Fat Man',
          'Thunder and Lightning',
          'Alpha and Omega',
        ],
        correctIndex: 1,
        explanation:
          'The two atomic bombs were "Little Boy" (Hiroshima, Aug 6) and "Fat Man" (Nagasaki, Aug 9).',
      },
      {
        id: 'q7',
        text: 'Who was the Prime Minister of the UK during most of WWII?',
        options: ['Clement Attlee', 'Anthony Eden', 'Winston Churchill', 'Neville Chamberlain'],
        correctIndex: 2,
        explanation:
          'Winston Churchill became Prime Minister in May 1940 and led Britain through most of the war.',
      },
      {
        id: 'q8',
        text: 'What was the Lend-Lease Act?',
        options: [
          'A German economic policy',
          'A US program to supply Allied nations with war materials',
          'The British rationing system',
          'A Soviet industrialization plan',
        ],
        correctIndex: 1,
        explanation:
          'The Lend-Lease Act (1941) allowed the US to supply Allied nations with war materials without violating neutrality.',
      },
      {
        id: 'q9',
        text: 'Which conference divided post-war Europe into spheres of influence?',
        options: [
          'Paris Conference',
          'Geneva Conference',
          'Potsdam Conference',
          'Yalta Conference',
        ],
        correctIndex: 3,
        explanation:
          "The Yalta Conference (February 1945) saw Roosevelt, Churchill, and Stalin divide post-war Europe.",
      },
      {
        id: 'q10',
        text: 'What was the Holocaust?',
        options: [
          'A major naval battle in the Pacific',
          'The German blitzkrieg into France',
          'The genocide of six million Jews by Nazi Germany',
          'The Allied bombing campaign over Germany',
        ],
        correctIndex: 2,
        explanation:
          'The Holocaust was the systematic genocide of six million Jews and millions of others by the Nazi regime.',
      },
    ],
  },
  {
    topic: 'Probability Theory',
    subject: 'Mathematics',
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        text: 'What is the probability of rolling a 6 on a fair six-sided die?',
        options: ['1/2', '1/4', '1/6', '1/3'],
        correctIndex: 2,
        explanation: 'A fair six-sided die has 6 equally likely outcomes, so P(6) = 1/6.',
      },
      {
        id: 'q2',
        text: "What is Bayes' Theorem used for?",
        options: [
          'Calculating geometric means',
          'Updating probabilities given new evidence',
          'Finding standard deviations',
          'Estimating population size',
        ],
        correctIndex: 1,
        explanation:
          "Bayes' Theorem provides a way to update the probability of a hypothesis when given evidence.",
      },
      {
        id: 'q3',
        text: 'Two events are independent if:',
        options: [
          'They cannot occur together',
          'P(A and B) = P(A) + P(B)',
          'P(A and B) = P(A) × P(B)',
          'They have equal probability',
        ],
        correctIndex: 2,
        explanation:
          'Events A and B are independent if the occurrence of one does not affect the other: P(A∩B) = P(A)P(B).',
      },
      {
        id: 'q4',
        text: 'What is the expected value?',
        options: [
          'The most likely outcome',
          'The median of a distribution',
          'The probability-weighted average of all outcomes',
          'The highest possible outcome',
        ],
        correctIndex: 2,
        explanation: 'Expected value is the sum of each outcome multiplied by its probability.',
      },
      {
        id: 'q5',
        text: 'What is the complement rule in probability?',
        options: [
          'P(A) = P(B) for complementary events',
          "P(A) + P(A') = 1",
          'P(A or B) = P(A) × P(B)',
          'P(A) = 1 - P(A and B)',
        ],
        correctIndex: 1,
        explanation:
          "The complement rule states that P(A) + P(A') = 1, so P(A') = 1 - P(A).",
      },
    ],
  },
]

export const INITIAL_MOCK_QUIZZES = [
  {
    id: 'quiz-001',
    title: 'React Hooks Deep Dive',
    topic: 'React Hooks',
    subject: 'Computer Science',
    difficulty: 'medium',
    questionCount: 10,
    timerEnabled: true,
    timeLimit: 600,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    questions: MOCK_QUIZ_TEMPLATES[0].questions,
    attempted: true,
    lastScore: 80,
  },
  {
    id: 'quiz-002',
    title: 'Big O Notation Mastery',
    topic: 'Big O Notation',
    subject: 'Computer Science',
    difficulty: 'hard',
    questionCount: 5,
    timerEnabled: false,
    timeLimit: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    questions: MOCK_QUIZ_TEMPLATES[1].questions,
    attempted: true,
    lastScore: 60,
  },
  {
    id: 'quiz-003',
    title: 'Quantum Mechanics Basics',
    topic: 'Quantum Mechanics',
    subject: 'Physics',
    difficulty: 'hard',
    questionCount: 5,
    timerEnabled: false,
    timeLimit: null,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    questions: MOCK_QUIZ_TEMPLATES[2].questions,
    attempted: false,
    lastScore: null,
  },
  {
    id: 'quiz-004',
    title: 'World War II: Turning Points',
    topic: 'World War II',
    subject: 'History',
    difficulty: 'medium',
    questionCount: 10,
    timerEnabled: true,
    timeLimit: 480,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    questions: MOCK_QUIZ_TEMPLATES[3].questions,
    attempted: true,
    lastScore: 90,
  },
  {
    id: 'quiz-005',
    title: 'Probability Theory Fundamentals',
    topic: 'Probability Theory',
    subject: 'Mathematics',
    difficulty: 'medium',
    questionCount: 5,
    timerEnabled: false,
    timeLimit: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    questions: MOCK_QUIZ_TEMPLATES[4].questions,
    attempted: false,
    lastScore: null,
  },
]

export const INITIAL_MOCK_ATTEMPTS = [
  {
    id: 'attempt-001',
    quizId: 'quiz-001',
    quizTitle: 'React Hooks Deep Dive',
    subject: 'Computer Science',
    difficulty: 'medium',
    score: 80,
    correctCount: 8,
    totalCount: 10,
    timeTaken: 342,
    attemptedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    answers: { q1: 1, q2: 2, q3: 1, q4: 2, q5: 1, q6: 1, q7: 1, q8: 2, q9: 2, q10: 2 },
    questions: MOCK_QUIZ_TEMPLATES[0].questions,
  },
  {
    id: 'attempt-002',
    quizId: 'quiz-002',
    quizTitle: 'Big O Notation Mastery',
    subject: 'Computer Science',
    difficulty: 'hard',
    score: 60,
    correctCount: 3,
    totalCount: 5,
    timeTaken: 198,
    attemptedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    answers: { q1: 1, q2: 2, q3: 0, q4: 2, q5: 2 },
    questions: MOCK_QUIZ_TEMPLATES[1].questions,
  },
  {
    id: 'attempt-003',
    quizId: 'quiz-004',
    quizTitle: 'World War II: Turning Points',
    subject: 'History',
    difficulty: 'medium',
    score: 90,
    correctCount: 9,
    totalCount: 10,
    timeTaken: 410,
    attemptedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    answers: { q1: 2, q2: 1, q3: 1, q4: 2, q5: 1, q6: 1, q7: 2, q8: 1, q9: 3, q10: 2 },
    questions: MOCK_QUIZ_TEMPLATES[3].questions,
  },
]

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', quizzes: 1, score: 75 },
  { day: 'Tue', quizzes: 2, score: 82 },
  { day: 'Wed', quizzes: 0, score: 0 },
  { day: 'Thu', quizzes: 3, score: 88 },
  { day: 'Fri', quizzes: 1, score: 70 },
  { day: 'Sat', quizzes: 2, score: 90 },
  { day: 'Sun', quizzes: 1, score: 85 },
]
