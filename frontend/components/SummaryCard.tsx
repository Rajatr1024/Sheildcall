type Props = {
  summary: string;
};

export default function SummaryCard({ summary }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          📄
        </div>
        <h3 className="text-sm font-semibold text-gray-800">
          Call Summary
        </h3>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        {summary}
      </p>
    </div>
  );
}