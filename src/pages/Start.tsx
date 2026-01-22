import React, { type JSX } from "react";

interface StartProps {
  onStart: () => void;
}

export default function Start({ onStart }: StartProps): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Psychometric Assessment
        </h1>

        <p className="text-gray-600 mb-6">
          Discover your interests, strengths, and suitable career paths.
        </p>

        <button
          onClick={onStart}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
}
