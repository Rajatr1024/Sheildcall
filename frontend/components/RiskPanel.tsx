type Props = {
  sentiment: { overall: string };
  riskFlags: string[];
};

export default function RiskPanel({ sentiment, riskFlags }: Props) {
  const riskLevel = riskFlags.length > 0 ? "High" : "Low";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600">
          ⚠️
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Risk & Sentiment
        </h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Risk Level</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            riskLevel === "High"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}>
            {riskLevel}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Sentiment</span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
            {sentiment?.overall || "neutral"}
          </span>
        </div>
      </div>
    </div>
  );
}