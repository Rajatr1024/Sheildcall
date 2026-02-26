import SummaryCard from "@/components/SummaryCard";
import RiskPanel from "@/components/RiskPanel";
import ConfidenceCard from "@/components/ConfidenceCard";
import TranscriptViewer from "@/components/TranscriptViewer";
import TalkRatioChart from "@/components/TalkRatioChart";
import SilenceCard from "@/components/SilenceCard";
import InterruptionCard from "@/components/InterruptionCard";
import InsightsPanel from "@/components/InsightsPanel";
import Link from "next/link";

import { fetchCallData } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: { id?: string };
}) {

  const id = searchParams.id || "latest";
  const data = await fetchCallData(id);
  const {
    summary,
    sentiment,
    risk_flags,
    confidence,
    transcript,
    conversation_analytics,
    insights,
  } = data;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          ShieldCall — Call Intelligence Dashboard
        </h1>
        <Link
  href="/upload"
  className="inline-block mt-2 text-blue-600 underline"
>
  Upload New Call
</Link>

<Link
  href="/calls"
  className="text-blue-600 underline"
>
  View Call History
</Link>

        <div className="grid grid-cols-3 gap-6">
          <SummaryCard summary={summary} />

          <RiskPanel
            sentiment={sentiment}
            riskFlags={risk_flags}
          />

          <ConfidenceCard
            score={confidence.overall_score}
          />
        </div>

        <TranscriptViewer transcript={transcript} />

        <div className="grid grid-cols-3 gap-6">
          <TalkRatioChart
            ratio={conversation_analytics.talk_ratio}
          />

          <SilenceCard
            seconds={
              conversation_analytics.total_silence_seconds
            }
          />

          <InterruptionCard
            count={
              conversation_analytics.interruptions
            }
          />
        </div>

        <InsightsPanel insights={insights} />
      </div>
    </main>
  );
}