import SummaryCard from "@/components/SummaryCard";
import RiskPanel from "@/components/RiskPanel";
import ConfidenceCard from "@/components/ConfidenceCard";
import SilenceCard from "@/components/SilenceCard";
import InterruptionCard from "@/components/InterruptionCard";
import InsightsPanel from "@/components/InsightsPanel";
import TranscriptViewer from "@/components/TranscriptViewer";
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

const safeData = data && !data.error
  ? data
  : {
      summary: "No data yet",
      sentiment: { overall: "neutral" },
      risk_flags: [],
      confidence: { overall_score: 0 },
      transcript: [],
      conversation_analytics: {
        talk_ratio: {},
        total_silence_seconds: 0,
        interruptions: 0,
      },
      insights: {
        call_type: "N/A",
        risk_level: "low",
        customer_sentiment: "neutral",
        agent_dominance: false,
        escalation_required: false,
      },
      audio_file: null,
    };

  const {
  summary,
  sentiment,
  risk_flags,
  confidence,
  transcript,
  conversation_analytics,
  insights,
  audio_file,
} = safeData;

  const audioUrl = audio_file
    ? `http://localhost:8000/audio/${audio_file}`
    : undefined;

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">

      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span className="text-blue-600">🛡️</span> ShieldCall
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/calls" className="text-gray-600 hover:text-black">
            Call History
          </Link>
          <Link href="/escalations" className="text-gray-600 hover:text-red-600">
            Escalations
          </Link>
          <Link
            href="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Upload Call
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* TITLE */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Call Analysis
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Review AI-processed call intelligence
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard summary={summary} />
          <RiskPanel sentiment={sentiment} riskFlags={risk_flags} />
          <ConfidenceCard score={confidence?.overall_score ?? 0} />
        </div>

        {/* PLAYBACK + TRANSCRIPT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* AUDIO */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">
              Audio Playback
            </h3>

            {audioUrl && (
              <audio controls className="w-full">
                <source src={audioUrl} />
              </audio>
            )}
          </div>

          {/* TRANSCRIPT */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">
              Transcript
            </h3>

            <div className="h-80 overflow-y-auto pr-2">
              <TranscriptViewer transcript={transcript} />
            </div>
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* TALK RATIO */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">
              Talk Ratio
            </h3>

            {(() => {
              const agent = Math.round(
                (conversation_analytics?.talk_ratio?.SPEAKER_00 || 0) * 100
              );
              const customer = Math.round(
                (conversation_analytics?.talk_ratio?.SPEAKER_01 || 0) * 100
              );

              return (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Agent</span>
                      <span>{agent}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${agent}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer</span>
                      <span>{customer}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-gray-400 rounded-full"
                        style={{ width: `${customer}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          <SilenceCard
            seconds={conversation_analytics?.total_silence_seconds ?? 0}
          />

          <InterruptionCard
            count={conversation_analytics?.interruptions ?? 0}
          />
        </div>

        {/* INSIGHTS */}
        <InsightsPanel insights={insights} />

      </div>
    </main>
  );
}