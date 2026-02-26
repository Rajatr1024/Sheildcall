export const callData = {
  summary:
    "The caller contacted the bank regarding an urgent transfer. The agent requested verification details.",

  sentiment: {
    overall: "negative",
    confidence: 0.84,
  },

  risk_flags: [
    {
      type: "scam_call_detected",
      confidence: 0.91,
    },
  ],

  confidence: {
    overall_score: 0.42,
  },

  conversation_analytics: {
    talk_ratio: {
      SPEAKER_00: 0.58,
      SPEAKER_01: 0.42,
    },
    total_silence_seconds: 9.7,
    interruptions: 2,
  },

  transcript: [
    {
      speaker: "SPEAKER_00",
      text: "Hello, I need to transfer money urgently.",
    },
    {
      speaker: "SPEAKER_01",
      text: "Please verify your OTP before proceeding.",
    },
    
  ],
  insights: {
  call_type: "financial",
  risk_level: "high",
  customer_sentiment: "negative",
  agent_dominance: true,
  escalation_required: true,
},
};