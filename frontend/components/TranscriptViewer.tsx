type Line = {
  speaker: string;
  text: string;
};

type Props = {
  transcript: Line[];
};

export default function TranscriptViewer({
  transcript,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold text-lg mb-4">
        Transcript
      </h2>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {transcript.map((line, index) => (
          <div
            key={index}
            className={`flex gap-2 p-2 rounded ${
              line.speaker === "SPEAKER_00"
                ? "bg-blue-50"
                : "bg-green-50"
            }`}
          >
            <span className="font-bold">
              {line.speaker}:
            </span>
            <span>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}