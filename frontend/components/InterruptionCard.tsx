export default function InterruptionCard({ count }: { count: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">
        Interruptions
      </h3>

      <div className="text-3xl font-bold text-gray-900">
        {count}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Detected speaker overlaps
      </p>
    </div>
  );
}