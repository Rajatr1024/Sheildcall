type Props = {
  score: number;
};

export default function ConfidenceCard({ score }: Props) {
  const percent = Math.round(score * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
          🤖
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          AI Confidence
        </h3>
      </div>

      <div className="text-3xl font-bold text-gray-900 mb-3">
        {percent}%
      </div>

      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 rounded-full bg-linear-to-r from-blue-500 to-indigo-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}