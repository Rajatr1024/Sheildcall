type Props = {
  insights: {
    call_type: string;
    risk_level: string;
    customer_sentiment: string;
    agent_dominance: boolean;
    escalation_required: boolean;
  };
};

export default function InsightsPanel({
  insights,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="font-semibold text-lg">
        AI Insights
      </h2>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <div>
          <span className="font-semibold">
            Call Type:
          </span>{" "}
          {insights.call_type}
        </div>

        <div>
          <span className="font-semibold">
            Risk Level:
          </span>{" "}
          <span
            className={`px-2 py-1 rounded text-xs ${
              insights.risk_level === "high"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {insights.risk_level}
          </span>
        </div>

        <div>
          <span className="font-semibold">
            Customer Sentiment:
          </span>{" "}
          {insights.customer_sentiment}
        </div>

        <div>
          <span className="font-semibold">
            Agent Dominance:
          </span>{" "}
          {insights.agent_dominance
            ? "Yes"
            : "No"}
        </div>
      </div>

      {insights.escalation_required && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg font-semibold">
          ⚠ Escalation Required
        </div>
      )}
    </div>
  );
}