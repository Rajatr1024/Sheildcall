"use client";

import { useRef, useState } from "react";
import CallPlayer from "./CallPlayer";
import TranscriptViewer from "./TranscriptViewer";

type TranscriptSegment = {
  speaker: string;
  text: string;
  start: number;
  end: number;
};

type PlaybackSectionProps = {
  audioUrl: string;
  transcript: TranscriptSegment[];
};

export default function PlaybackSection({
  audioUrl,
  transcript,
}: PlaybackSectionProps) {
  const [time, setTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSeek = (seekTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      audioRef.current.play();
    }
  };

  return (
    <div className="space-y-4">
      <CallPlayer
        audioUrl={audioUrl}
        onTimeUpdate={setTime}
        audioRef={audioRef}
      />

      <TranscriptViewer
        transcript={transcript}
        currentTime={time}
        onSeek={handleSeek}
      />
    </div>
  );
}