"use client";
import { useState } from "react";
import QuizSimulator from "@/components/QuizSimulator";
import TrainingProgress from "@/components/TrainingProgress";

type Scenario = {
  id: number;
  type: "email" | "chat" | "other";
  content: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const phishingScenarios: Scenario[] = [
  {
    id: 1,
    type: "email",
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

export default function TrainingPage() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const handleNext = (isCorrect: boolean) => {
    if (isCorrect) setScore((prev) => prev + 1);
    setCompleted((prev) => [...prev, currentScenario]);
    setCurrentScenario((prev) => (prev + 1) % phishingScenarios.length);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center my-10">
        <h1 className="text-4xl font-extrabold text-white">
          🧠 Phishing Awareness Training
        </h1>
        <p className="text-slate-400 mt-2">
          Learn to detect real-world phishing and social engineering attempts.
        </p>
      </div>

      <TrainingProgress
        current={currentScenario + 1}
        total={phishingScenarios.length}
        score={score}
      />

      <QuizSimulator
        scenario={phishingScenarios[currentScenario]}
        onNext={handleNext}
        showAnswer={completed.includes(currentScenario)}
      />

      <div className="relative group mt-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

        <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 shadow-2xl transition hover:bg-white/10 hover:shadow-blue-500/25">
          <h2 className="text-xl font-bold text-white mb-4">
            💡 Tips to Remember:
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Check sender email addresses carefully</li>
            <li>Never click links in unsolicited messages</li>
            <li>Look for urgency or threat language</li>
            <li>Verify requests through official channels</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
