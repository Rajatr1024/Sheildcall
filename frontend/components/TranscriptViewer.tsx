"use client";

import { useEffect } from "react";

type TranscriptSegment = {
  speaker: string;
  text: string;
  start: number;
  end: number;
};

type TranscriptViewerProps = {
  transcript: TranscriptSegment[];
  currentTime?: number;
  onSeek?: (time: number) => void;
};

const speakerColors: Record<string, string> = {
  SPEAKER_00: "bg-blue-50 border-l-4 border-blue-400",
  SPEAKER_01: "bg-green-50 border-l-4 border-green-400",
};

export default function TranscriptViewer({
  transcript,
  currentTime = 0,
  onSeek,
}: TranscriptViewerProps) {
  useEffect(() => {
    const active = document.querySelector(".active-segment");
    active?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentTime]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow h-112.5 overflow-y-auto">
      {transcript.map((seg: TranscriptSegment, i: number) => {
        const active =
           typeof seg.start === "number" &&
           typeof seg.end === "number" &&
           currentTime >= seg.start &&
           currentTime <= seg.end;

        const speakerStyle =
          speakerColors[seg.speaker] ??
          "bg-gray-50 border-l-4 border-gray-300";

        return (
          <div
            key={i}
            onClick={() => onSeek?.(seg.start)}
            className={`p-3 rounded mb-3 cursor-pointer transition ${
              speakerStyle
            } ${
              active
                ? "active-segment ring-2 ring-blue-400"
                : ""
            }`}
          >
            <div className="text-sm font-semibold mb-1">
              {seg.speaker}
            </div>

            <div className="text-sm">
              {seg.text}
            </div>

            <div className="text-xs text-gray-500 mt-1">
  {typeof seg.start === "number" &&
   typeof seg.end === "number" ? (
    <>
      {seg.start.toFixed(1)}s - {seg.end.toFixed(1)}s
    </>
  ) : (
    "—"
  )}
</div>
          </div>
        );
      })}
    </div>
  );
}