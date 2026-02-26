type Props = {
  summary: string;
};

export default function SummaryCard({ summary }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-2">
      <h2 className="font-semibold text-lg">Summary</h2>
      <p className="text-gray-600 leading-relaxed">
        {summary}
      </p>
    </div>
  );
}