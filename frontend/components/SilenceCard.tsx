type Props = {
  seconds: number;
};

export default function SilenceCard({
  seconds,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold">
        Silence Duration
      </h2>

      <p className="text-2xl font-bold mt-2">
        {seconds}s
      </p>
    </div>
  );
}