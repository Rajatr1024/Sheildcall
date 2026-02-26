type Props = {
  count: number;
};

export default function InterruptionCard({
  count,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold">
        Interruptions
      </h2>

      <p className="text-2xl font-bold mt-2">
        {count}
      </p>
    </div>
  );
}