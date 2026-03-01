"use client";

import { useState, RefObject } from "react";

type CallPlayerProps = {
  audioUrl: string;
  onTimeUpdate?: (time: number) => void;
  audioRef: RefObject<HTMLAudioElement | null>;
};

export default function CallPlayer({
  audioUrl,
  onTimeUpdate,
  audioRef,
}: CallPlayerProps) {
  const [time, setTime] = useState<number>(0);

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <audio
        ref={audioRef}
        src={audioUrl}
        controls
        className="w-full"
        onTimeUpdate={(e) => {
          const t = e.currentTarget.currentTime;
          setTime(t);
          onTimeUpdate?.(t);
        }}
      />

      <div className="text-sm mt-2 text-gray-600">
        {time.toFixed(1)} sec
      </div>
    </div>
  );
}