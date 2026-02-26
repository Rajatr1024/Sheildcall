type Props = {
  score: number;
};

export default function ConfidenceCard({ score }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-3">
      <h2 className="font-semibold text-lg">
        Confidence Score
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-purple-600 h-4 rounded-full"
          style={{
            width: `${score * 100}%`,
          }}
        />
      </div>

      <p className="text-xl font-bold">
        {(score * 100).toFixed(0)}%
      </p>
    </div>
  );
}