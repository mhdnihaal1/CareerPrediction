import React from "react";

interface ResultProps {
  result: {
    bestCareer: string;
    topCareers: { name: string; score: number }[];
  };
}

export default function Result({ result }: ResultProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-full max-w-md">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2">
          🎯 Your Career Insight
        </h2>
        <p className="text-gray-500 mb-6">
          Based on your answers, this path fits you best
        </p>

        {/* Best Career */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-600 mb-1">
            Recommended Career
          </p>
          <p className="text-2xl font-bold text-blue-700">
            {result.bestCareer.toUpperCase()}
          </p>
        </div>

        {/* Motivation Text */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          🌟 This result reflects your personality, interests, and real-world
          thinking. With consistent learning, practice, and confidence,
          you can build a successful future in this field.
        </p>

        {/* Top Matches */}
        <h3 className="text-lg font-semibold mb-3">
          Other Strong Career Matches
        </h3>

        <ul className="space-y-3 mb-6">
          {result.topCareers.map((c, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
            >
              <span className="capitalize">{c.name}       :</span>
              <span className="font-semibold text-gray-700">
                {Math.round(c.score)}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer Motivation */}
        <p className="text-sm text-gray-500">
          🚀 Remember: Your career grows with effort, skills, and mindset.
          This is just the beginning!
        </p>
      </div>
    </div>
  );
}
