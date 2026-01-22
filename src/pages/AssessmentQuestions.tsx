import React, { useEffect, useState } from "react";
 
interface Props {
  title: string;
  questions: any[];
  onFinish: () => void;
}
type Career =
  | "medical"
  | "engineering"
  | "it"
  | "gaming"
  | "army"
  | "social"
  | "agricultural";

type CareerScore = Record<Career, number>;
 

export default function AssessmentQuestions({
  title,
  questions,
  onFinish,
}: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Initialize answers when questions load
  useEffect(() => {
    const obj: Record<number, string> = {};
    questions.forEach((q) => {
      obj[q.id] = "";
    });
    setAnswers(obj);
  }, [questions]);

  const getMissingCount = () => {
    return Object.values(answers).filter((v) => v === "").length;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
            
      <div className="bg-white max-w-3xl mx-auto rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={q.id}>
              <h3 className="font-semibold mb-3">
                {index + 1}. {q.question}
              </h3>

              <div className="space-y-2">
                {q.options.map((opt: string, i: number) => (
                  <button
                    key={i}
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: "opt",
                      }))
                    }
                    className={`w-full border p-3 rounded-lg text-left transition
                      ${
                        answers[q.id] === opt
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button>hello world</button>
          <h1>hello</h1>
        </div>

        {/* Continue */}
           {/* Continue */}
    <div className="text-center mt-8">
      <button
        onClick={() => {
          const missing = getMissingCount();
        //   if (missing > 0) {
        //     alert(`⚠️ Please answer all questions\nMissing: ${missing}`);
        //     return;
        //   }
          onFinish();
        }}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Continue
      </button>
      </div>
      </div>
    </div>
  );
}
