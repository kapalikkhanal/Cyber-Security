"use client";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function QuizSimulator({
  scenario,
  onNext,
  showAnswer,
}: {
  scenario: any;
  onNext: (isCorrect: boolean) => void;
  showAnswer: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    setShowFeedback(true);
    if (selectedOption !== null) {
      onNext(selectedOption === scenario.correctAnswer);
    }
  };

  const isCorrect = selectedOption === scenario.correctAnswer;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border max-w-3xl mx-auto transition-all duration-300">
      <div
        className={`p-4 md:p-5 mb-6 rounded-xl border-l-8 ${
          scenario.type === "email"
            ? "bg-yellow-50 border-yellow-400"
            : scenario.type === "chat"
            ? "bg-blue-50 border-blue-400"
            : "bg-gray-100 border-gray-400"
        }`}
      >
        <p className="text-sm font-semibold text-gray-700 mb-2">
          {scenario.type === "email" ? "Suspicious Email:" : "Chat Message:"}
        </p>
        <p className="whitespace-pre-line text-sm text-gray-800">
          {scenario.content}
        </p>
      </div>

      <h3 className="font-semibold text-xl text-gray-900 mb-4">
        {scenario.question}
      </h3>

      <div className="space-y-3 mb-6">
        {scenario.options.map((option: string, index: number) => (
          <label
            key={index}
            htmlFor={`option-${scenario.id}-${index}`}
            className={`flex items-start gap-3 p-4 border rounded-xl transition hover:bg-gray-50 cursor-pointer ${
              showFeedback &&
              index === scenario.correctAnswer &&
              "border-green-500 bg-green-50"
            }`}
          >
            <input
              type="radio"
              id={`option-${scenario.id}-${index}`}
              name={`scenario-${scenario.id}`}
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              className="mt-1 accent-blue-600"
            />
            <span className="text-sm text-gray-800">{option}</span>
          </label>
        ))}
      </div>

      {!showFeedback ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Submit Answer
        </button>
      ) : (
        <div
          className={`mt-4 p-5 rounded-xl shadow-inner transition-all duration-300 ${
            isCorrect
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <p className="text-lg font-bold">
            {isCorrect ? "✓ Correct!" : "✗ Incorrect!"}
          </p>
          <p className="mt-2 text-sm">
            {isCorrect
              ? "You correctly identified this phishing attempt."
              : `This was a phishing attempt. ${
                  scenario.type === "email"
                    ? "Never click links in unsolicited emails."
                    : "Never share verification codes or sensitive info in chats."
                }`}
          </p>
        </div>
      )}
    </div>
  );
}
