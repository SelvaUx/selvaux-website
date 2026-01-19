// System metadata and personality configuration
export const metadata = {
    name: "SaraAI",
    version: "2.0",
    mode: "LOCAL SIMULATION",
    status: "ONLINE",

    personality: {
        tone: "professional",
        style: "helpful and informative",
        approach: "architecture-focused"
    },

    systemInfo: {
        type: "Offline AI Behavior Engine",
        architecture: "Intent-based Pattern Matching",
        features: [
            "Text normalization",
            "Intent detection",
            "Response mapping",
            "Local processing"
        ],
        notCapableOf: [
            "Cloud API calls",
            "Real-time external data",
            "Machine learning (this is rule-based)"
        ]
    },

    statistics: {
        totalIntents: 0, // Will be calculated dynamically
        totalPatterns: 0,
        totalResponses: 0
    }
};
