type Props = {
  sentiment: {
    overall: string;
    confidence: number;
  };
  riskFlags: any[];
};

export default function RiskPanel({
  sentiment,
  riskFlags,
}: Props) {
  const riskLevel =
    riskFlags.length > 0 ? "High Risk" : "No Risk";

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="font-semibold text-lg">
        Risk & Sentiment
      </h2>

      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          riskFlags.length > 0
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {riskLevel}
      </span>

      <div>
        <p className="text-sm mb-1">
          Sentiment: {sentiment.overall}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{
              width: `${sentiment.confidence * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}