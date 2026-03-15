import SummaryCard from "@/components/SummaryCard";
import RiskPanel from "@/components/RiskPanel";
import ConfidenceCard from "@/components/ConfidenceCard";
import PlaybackSection from "@/components/PlaybackSection";
import TalkRatioChart from "@/components/TalkRatioChart";
import SilenceCard from "@/components/SilenceCard";
import InterruptionCard from "@/components/InterruptionCard";
import InsightsPanel from "@/components/InsightsPanel";
import Link from "next/link";

import { fetchCallData } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {

  const params = await searchParams;
  const id = params?.id || "latest";

  const data = await fetchCallData(id);

  // safety guard
  if (!data) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        Failed to load call data.
      </main>
    );
  }

  const {
    summary,
    sentiment,
    risk_flags,
    confidence,
    transcript,
    conversation_analytics,
    insights,
    audio_file
  } = data;

  const audioUrl = audio_file
    ? `http://localhost:8000/audio/${audio_file}`
    : undefined;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">
          ShieldCall — Call Intelligence Dashboard
        </h1>

        <div className="flex gap-4">

          <Link
            href="/upload"
            className="text-blue-600 underline"
          >
            Upload New Call
          </Link>

          <Link
            href="/calls"
            className="text-blue-600 underline"
          >
            View Call History
          </Link>

          <Link
            href="/escalations"
            className="text-red-600 underline"
          >
            Escalation Queue
          </Link>

        </div>

        <div className="grid grid-cols-3 gap-6">
          <SummaryCard summary={summary} />

          <RiskPanel
            sentiment={sentiment}
            riskFlags={risk_flags}
          />

          <ConfidenceCard
            score={confidence?.overall_score ?? 0}
          />
        </div>

        {audioUrl && transcript && (
          <PlaybackSection
            audioUrl={audioUrl}
            transcript={transcript}
          />
        )}

        <div className="grid grid-cols-3 gap-6">

          <TalkRatioChart
            ratio={conversation_analytics?.talk_ratio ?? {}}
          />

          <SilenceCard
            seconds={
              conversation_analytics?.total_silence_seconds ?? 0
            }
          />

          <InterruptionCard
            count={
              conversation_analytics?.interruptions ?? 0
            }
          />

        </div>

        <InsightsPanel insights={insights} />

      </div>
    </main>
  );
}