export default function ThreatIndicator({
  confidence,
}: {
  confidence: number;
}) {
  const getColor = (value: number) => {
    if (value < 30) return "bg-green-500";
    if (value < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getThreatLevel = (value: number) => {
    if (value < 30) return "Low Risk";
    if (value < 70) return "Medium Risk";
    return "High Risk";
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium">Threat Confidence</span>
        <span className="font-semibold">{confidence}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getColor(confidence)}`}
          style={{ width: `${confidence}%` }}
        ></div>
      </div>

      <div className="mt-1 text-sm text-gray-600">
        {getThreatLevel(confidence)} • Based on {confidence} threat indicators
      </div>
    </div>
  );
}
