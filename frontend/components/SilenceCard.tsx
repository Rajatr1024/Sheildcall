export default function SilenceCard({ seconds }: { seconds: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">
        Silence Duration
      </h3>

      <div className="text-3xl font-bold text-gray-900">
        {seconds}s
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Total silence across call
      </p>
    </div>
  );
}