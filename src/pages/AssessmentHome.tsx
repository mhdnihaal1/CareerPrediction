import React, { useEffect, useState } from "react";

interface AssessmentProps {
  onFinish: (result: {
    bestCareer: string;
    topCareers: { name: string; score: number }[];
  }) => void;
}

interface Option {
  text: string;
  score: number;
}

interface Question {
  id: number;
  question: string;
  category: Career;
  option: "personality" | "realworld" | "career";
  options: Option[];
}

type Career =
  | "medical"
  | "engineering"
  | "it"
  | "gaming"
  | "army"
  | "social"
  | "agricultural"
  | "government";

const categories = [
  { key: "personality", label: "🧠 Personality" },
  { key: "realworld", label: "🌍 Real World" },
  { key: "career", label: "🎯 Career" },
] as const;

export default function AssessmentHome({ onFinish }: AssessmentProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] =
    useState<Question["option"]>("personality");

  // ---------------- LOGIC ----------------

  function findBestCareer(
    questions: Question[],
    answers: Record<number, number>
  ) {
    const scores: Record<Career, number> = {
      medical: 0,
      engineering: 0,
      it: 0,
      gaming: 0,
      army: 0,
      social: 0,
      agricultural: 0,
      government: 0,
    };

    questions.forEach((q) => {
      const score = answers[q.id];
      if (!score) return;

      let weight = 1;
      if (q.option === "realworld") weight = 1.2;
      if (q.option === "career") weight = 1.5;

      scores[q.category] += score * weight;
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    return {
      bestCareer: sorted[0],
      topCareers: sorted.slice(0, 3),
      allScores: scores,
    };
  }

  // ---------------- EFFECT ----------------

  useEffect(() => {
    fetch("https://careerprediction-backend.onrender.com/api/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  const filteredQuestions = questions.filter(
    (q) => q.option === activeCategory
  );

  // ---------------- HANDLERS ----------------

  const handleSelect = (questionId: number, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  };

  

  const submit = () => {
  if (Object.keys(answers).length !== questions.length) {
    alert("⚠️ Please answer all questions");
    return;
  }

  const result = findBestCareer(questions, answers);

  onFinish({
    bestCareer: result.bestCareer[0],
    topCareers: result.topCareers.map(([name, score]) => ({
      name,
      score,
    })),
  });
};


  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Psychometric Assessment
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === cat.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Questions */}
        {filteredQuestions.map((q) => (
          <div key={q.id} className="mb-6">
            <h3 className="font-semibold mb-3">{q.question}</h3>

            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(q.id, opt.score)}
                className={`w-full text-left px-4 py-2 rounded-lg border mb-2 ${
                  answers[q.id] === opt.score
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white"
                }`}
              >
                {opt.text}
              </button>
            ))}

            {answers[q.id] && (
              <span className="text-green-600 font-semibold">✔ Answered</span>
            )}
          </div>
        ))}

        <div className="text-center mt-8">
          <button
            onClick={submit}
            className="px-8 py-3 bg-green-600 text-white rounded-lg"
          >
            Finish Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
