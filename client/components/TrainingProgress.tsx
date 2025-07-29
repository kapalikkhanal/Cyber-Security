export default function TrainingProgress({
  current,
  total,
  score,
}: {
  current: number;
  total: number;
  score: number;
}) {
  return (
    <div className="flex justify-between text-black items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
      <div className="font-medium">
        Scenario {current} of {total}
      </div>
      <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(current / total) * 100}%` }}
        ></div>
      </div>
      <div className="font-semibold">
        Score: {score}/{total}
      </div>
    </div>
  );
}
