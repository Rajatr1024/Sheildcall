"use client";

import { useEffect } from "react";
import { isRiskText } from "@/lib/riskDetection";

type TranscriptSegment = {
  speaker: string;
  text: string;
  start?: number;
  end?: number;
};

type TranscriptViewerProps = {
  transcript?: TranscriptSegment[];
  currentTime?: number;
  onSeek?: (time: number) => void;
};

const speakerColors: Record<string, string> = {
  SPEAKER_00: "bg-blue-50 border-l-4 border-blue-400",
  SPEAKER_01: "bg-green-50 border-l-4 border-green-400",
};

export default function TranscriptViewer({
  transcript = [],
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

  if (!transcript.length) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow">
        No transcript available.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow h-112.5 overflow-y-auto">
      {transcript.map((seg, i) => {

        const active =
          typeof seg.start === "number" &&
          typeof seg.end === "number" &&
          currentTime >= seg.start &&
          currentTime <= seg.end;

        const speakerStyle =
          speakerColors[seg.speaker] ??
          "bg-gray-50 border-l-4 border-gray-300";

        const isRisk = isRiskText(seg.text ?? "");

        return (
          <div
  key={i}
  onClick={() => {
  if (typeof seg.start === "number") {
    onSeek?.(seg.start);
  }
}}
  className={`p-4 rounded-lg mb-3 cursor-pointer transition border ${
    active
      ? "border-blue-500 bg-blue-50"
      : isRisk
      ? "border-red-200 bg-red-50"
      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
  }`}
>
  <div className="flex justify-between items-center mb-1">
    <span className="text-xs font-semibold text-gray-500">
      {seg.speaker}
    </span>

    <span className="text-xs text-gray-400">
      {typeof seg.start === "number" ? `${seg.start.toFixed(1)}s` : ""}
    </span>
  </div>

  <p className="text-sm text-gray-800 leading-relaxed">
    {isRisk && "⚠️ "}
    {seg.text}
  </p>
</div>
        );
      })}
    </div>
  );
}