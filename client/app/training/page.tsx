"use client";
import { useState } from "react";
import QuizSimulator from "@/components/QuizSimulator";
import TrainingProgress from "@/components/TrainingProgress";
import ProtectedRoute from "@/components/ProtectedRoute";

type Scenario = {
  id: number;
  type: "email" | "chat" | "other";
  content: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

const phishingScenarios: Scenario[] = [
  {
    id: 1,
    type: "email",
    difficulty: "beginner",
    content: `Subject: Urgent: Your account will be suspended!\n\nDear Customer,\n\nWe've detected unusual activity on your account. To prevent suspension, verify your details immediately:\nhttp://secure-bank-update.com/login\n\nIgnore this message if you didn't request this change.\n\nBank Security Team`,
    question: "What's the best response to this email?",
    options: [
      "Click the link to verify your account",
      "Contact your bank using their official website",
      "Forward the email to friends to warn them",
    ],
    correctAnswer: 1,
    explanation:
      "Legitimate banks never ask for verification via email links. Always navigate directly to official websites.",
  },
  {
    id: 2,
    type: "chat",
    difficulty: "beginner",
    content:
      "Hi [Your Name], this is IT Support. We need you to share your verification code (123456) to resolve a critical system issue.",
    question: "How should you handle this request?",
    options: [
      "Provide the code immediately",
      "Verify the request through official channels",
      "Ignore the message",
    ],
    correctAnswer: 1,
    explanation:
      "Never share verification codes. Real IT staff will never ask for them via chat.",
  },
  {
    id: 3,
    type: "email",
    difficulty: "beginner",
    content: `Subject: You've won a $1000 Gift Card!\n\nCongratulations! You’ve been selected to win a $1000 Amazon Gift Card. Just click the link below to claim your prize:\nhttp://claim-reward-now.co/prize\n\nHurry! Offer expires in 24 hours.`,
    question: "What should you do with this email?",
    options: [
      "Click the link and claim your prize",
      "Report the email as phishing",
      "Reply and ask for confirmation",
    ],
    correctAnswer: 1,
    explanation:
      "Unsolicited prize emails are often scams. Do not click unknown links or give personal info.",
  },
  {
    id: 4,
    type: "chat",
    difficulty: "beginner",
    content:
      "Hey, I’m your coworker John. I lost my phone and can’t access my work email. Can you quickly buy some gift cards for me? I’ll pay you back.",
    question: "What is the best course of action?",
    options: [
      "Buy the gift cards as requested",
      "Ask for reimbursement first",
      "Verify John’s identity through another channel",
    ],
    correctAnswer: 2,
    explanation:
      "Always confirm identity through another method. These are common gift card scams using impersonation.",
  },
  {
    id: 5,
    type: "email",
    difficulty: "beginner",
    content: `Subject: Security Alert: Login from New Device\n\nWe noticed a login to your account from a new device. If this wasn't you, click below to secure your account:\nhttp://safeguard-login.com/secure\n\nThanks,\nSecurity Team`,
    question: "How should you respond?",
    options: [
      "Click the link to secure your account",
      "Ignore it completely",
      "Log in to your account via the official website to verify activity",
    ],
    correctAnswer: 2,
    explanation:
      "Avoid links in emails. Visit the official site manually to check your login activity.",
  },
  {
    id: 6,
    type: "chat",
    difficulty: "beginner",
    content:
      "Hi, I'm from HR. We need your social security number to update payroll. Please reply ASAP.",
    question: "What should you do?",
    options: [
      "Send the SSN immediately to avoid delays",
      "Confirm the request with HR through official channels",
      "Ignore the message",
    ],
    correctAnswer: 1,
    explanation:
      "Sensitive info should only be shared through official, secure communication channels.",
  },
  {
    id: 7,
    type: "email",
    difficulty: "beginner",
    content: `Subject: Update Required for Tax Filing\n\nDear Employee,\n\nPlease download the attached document and fill in your personal tax details before EOD:\n\n[Attachment: tax_form_update.exe]`,
    question: "What’s the correct action?",
    options: [
      "Download and open the file",
      "Forward it to IT support",
      "Delete the email and notify your supervisor",
    ],
    correctAnswer: 2,
    explanation:
      "Executable attachments from unknown sources are highly dangerous. Do not open them.",
  },
  {
    id: 8,
    type: "chat",
    difficulty: "beginner",
    content:
      "This is Facebook support. Your account has been flagged. To avoid deletion, send your password for verification.",
    question: "How should you respond?",
    options: [
      "Send your password quickly",
      "Change your password immediately",
      "Report the message as suspicious",
    ],
    correctAnswer: 2,
    explanation:
      "No legitimate support team asks for passwords. Report and ignore such messages.",
  },
  {
    id: 9,
    type: "email",
    difficulty: "beginner",
    content: `Subject: Invoice #20993\n\nAttached is the invoice for the recent purchase. If you didn’t make this purchase, click the link below to cancel:\nhttp://cancel-payment.net`,
    question: "What's the safe way to respond?",
    options: [
      "Click the cancellation link",
      "Open the invoice and check the details",
      "Ignore the email and monitor your bank account via official app",
    ],
    correctAnswer: 2,
    explanation:
      "Ignore suspicious invoice emails unless verified from a known source. Don’t click links.",
  },
  {
    id: 10,
    type: "chat",
    difficulty: "beginner",
    content:
      "Urgent! Your company email is about to be deactivated. Click here to keep your access:\nhttp://email-verification-needed.com",
    question: "What should you do?",
    options: [
      "Click the link quickly to keep access",
      "Verify this through your IT admin",
      "Share the message with coworkers",
    ],
    correctAnswer: 1,
    explanation:
      "Always verify alarming messages via internal channels. Don’t click unknown links.",
  },
];

type QuizState = "start" | "quiz" | "results";

export default function TrainingPage() {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<
    { scenarioId: number; correct: boolean; userAnswer: number }[]
  >([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const startQuiz = () => {
    setQuizState("quiz");
    setCurrentScenario(0);
    setScore(0);
    setAnswers([]);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after showing explanation
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer === phishingScenarios[currentScenario].correctAnswer;

    setAnswers((prev) => [
      ...prev,
      {
        scenarioId: phishingScenarios[currentScenario].id,
        correct: isCorrect,
        userAnswer: selectedAnswer,
      },
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentScenario < phishingScenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizState("results");
    }
  };

  const restartQuiz = () => {
    setQuizState("start");
    setCurrentScenario(0);
    setScore(0);
    setAnswers([]);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-emerald-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90)
      return "Excellent! You're a phishing detection expert! 🏆";
    if (percentage >= 80)
      return "Great job! You have strong security awareness! 🎉";
    if (percentage >= 60)
      return "Good work! Keep practicing to improve your skills! 👍";
    return "Consider additional security training to better protect yourself! 📚";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (quizState === "start") {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center my-8">
              <h1 className="text-5xl font-bold text-white mb-4">
                Phishing Awareness Training
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Master the art of detecting phishing attacks and social
                engineering attempts
              </p>
            </div>

            {/* Training Overview */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-center text-white mb-6 flex items-center">
                Training Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl text-cyan-400 font-bold">
                    {phishingScenarios.length}
                  </div>
                  <div className="text-gray-400">Scenarios</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-green-400 font-bold">15</div>
                  <div className="text-gray-400">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-purple-400 font-bold">3</div>
                  <div className="text-gray-400">Difficulty Levels</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  What You&apos;ll Learn:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Identify suspicious email patterns
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Recognize social engineering tactics
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Verify suspicious communications
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Handle phishing attempts safely
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Protect personal information
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3 text-green-400">✓</span>
                      Report security threats
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Difficulty Levels */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Difficulty Levels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="font-semibold text-green-400">
                      Beginner
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Basic phishing attempts with obvious red flags
                  </p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    <span className="font-semibold text-yellow-400">
                      Intermediate
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    More sophisticated attacks requiring careful analysis
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="font-semibold text-red-400">Advanced</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Highly targeted spear-phishing and social engineering
                  </p>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <button
                onClick={startQuiz}
                className="px-8 py-4 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl transition-all duration-300 hover:from-cyan-400 hover:to-blue-400 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                Start Training
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (quizState === "results") {
    const percentage = Math.round((score / phishingScenarios.length) * 100);

    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <span className="text-6xl">
                  {percentage >= 80 ? "🏆" : percentage >= 60 ? "🎉" : "📚"}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Training Complete!
              </h1>
              <p className="text-gray-400">Here are your results</p>
            </div>

            {/* Score Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <div
                  className={`text-6xl font-bold mb-2 ${getScoreColor(
                    percentage
                  )}`}
                >
                  {percentage}%
                </div>
                <div className="text-xl text-gray-300 mb-4">
                  {score} out of {phishingScenarios.length} correct
                </div>
                <p className="text-lg text-gray-400">
                  {getScoreMessage(percentage)}
                </p>
              </div>

              {/* Detailed Results */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Question Review
                </h3>
                <div className="space-y-3">
                  {answers.map((answer, index) => {
                    const scenario = phishingScenarios[index];
                    return (
                      <div
                        key={scenario.id}
                        className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                      >
                        <div className="flex items-center">
                          <span
                            className={`text-xl mr-3 ${
                              answer.correct ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {answer.correct ? "✅" : "❌"}
                          </span>
                          <span className="text-white">
                            Question {index + 1}
                          </span>
                          <span
                            className={`ml-3 px-2 py-1 rounded text-xs border ${getDifficultyColor(
                              scenario.difficulty
                            )}`}
                          >
                            {scenario.difficulty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4">
              <button
                onClick={restartQuiz}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300"
              >
                <span className="mr-2">🔄</span>
                Retake Training
              </button>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="px-6 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-all duration-300"
              >
                <span className="mr-2">📊</span>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Quiz State
  const currentScenarioData = phishingScenarios[currentScenario];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <TrainingProgress
              current={currentScenario + 1}
              total={phishingScenarios.length}
              score={score}
            />
          </div>

          {/* Scenario Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Scenario {currentScenario + 1}
              </h2>
            </div>

            {/* Content */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                {currentScenarioData.type === "email"
                  ? "Email Content:"
                  : "Chat Message:"}
              </h3>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-gray-700">
                <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                  {currentScenarioData.content}
                </pre>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                {currentScenarioData.question}
              </h3>
              <div className="space-y-3">
                {currentScenarioData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      selectedAnswer === index
                        ? showExplanation
                          ? index === currentScenarioData.correctAnswer
                            ? "bg-green-500/20 border-green-500/50 text-green-300"
                            : "bg-red-500/20 border-red-500/50 text-red-300"
                          : "bg-blue-500/20 border-blue-500/50 text-blue-300"
                        : showExplanation &&
                          index === currentScenarioData.correctAnswer
                        ? "bg-green-500/20 border-green-500/50 text-green-300"
                        : "bg-slate-700/30 border-slate-600 text-gray-300 hover:bg-slate-700/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-semibold mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span>{option}</span>
                      {showExplanation &&
                        index === currentScenarioData.correctAnswer && (
                          <span className="ml-auto text-green-400">
                            ✓ Correct
                          </span>
                        )}
                      {showExplanation &&
                        selectedAnswer === index &&
                        index !== currentScenarioData.correctAnswer && (
                          <span className="ml-auto text-red-400">
                            ✗ Incorrect
                          </span>
                        )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center">
                  <span className="mr-2">💡</span>
                  Explanation
                </h4>
                <p className="text-gray-300">
                  {currentScenarioData.explanation}
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="text-center">
              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-3 font-bold rounded-lg transition-all ${
                    selectedAnswer !== null
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all"
                >
                  {currentScenario < phishingScenarios.length - 1
                    ? "Next Scenario"
                    : "View Results"}
                </button>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-3">💡</span>
              Security Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Always verify sender authenticity
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Check URLs before clicking
                </li>
              </ul>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  Be wary of urgent requests
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  When in doubt, verify independently
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
