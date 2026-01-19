// SaraAI Brain Logic - Intent Detection Engine
import { intents } from '../data/intents.js';
import { metadata } from '../data/metadata.js';
import { normalize } from './utils.js';

/**
 * Main intent detection and response generation engine
 */
class SaraEngine {
    constructor() {
        this.intents = intents;
        this.metadata = metadata;
        this.conversationHistory = [];
        this.lastIntent = null;
        this.confidence = 0;

        // Calculate statistics
        this.updateStatistics();
    }

    /**
     * Update system statistics
     */
    updateStatistics() {
        this.metadata.statistics.totalIntents = this.intents.length;
        this.metadata.statistics.totalPatterns = this.intents.reduce(
            (sum, intent) => sum + intent.patterns.length, 0
        );
        this.metadata.statistics.totalResponses = this.intents.reduce(
            (sum, intent) => sum + intent.responses.length, 0
        );
    }

    /**
     * Process user input and generate response
     * @param {string} userInput - Raw user message
     * @returns {Object} - Response object with message, intent, and confidence
     */
    processInput(userInput) {
        if (!userInput || userInput.trim() === "") {
            return {
                message: "Please say something!",
                intent: "empty_input",
                confidence: 0
            };
        }

        // Normalize input
        const normalizedInput = normalize(userInput);

        // Store in history
        this.conversationHistory.push({
            user: userInput,
            normalized: normalizedInput,
            timestamp: new Date()
        });

        // Find matching intent
        const result = this.matchIntent(normalizedInput);

        // Store last intent and confidence
        this.lastIntent = result.intent;
        this.confidence = result.confidence;

        return result;
    }

    /**
     * Match user input to intent patterns
     * @param {string} normalizedInput - Normalized user text
     * @returns {Object} - Response with message, intent tag, and confidence
     */
    matchIntent(normalizedInput) {
        let bestMatch = null;
        let highestConfidence = 0;

        // Loop through all intents
        for (const intent of this.intents) {
            // Check each pattern in the intent
            for (const pattern of intent.patterns) {
                const patternNormalized = normalize(pattern);

                // Direct match or contains pattern
                if (normalizedInput === patternNormalized) {
                    // Perfect match - highest confidence
                    return {
                        message: this.getRandomResponse(intent.responses),
                        intent: intent.tag,
                        confidence: 1.0,
                        matchedPattern: pattern
                    };
                } else if (normalizedInput.includes(patternNormalized)) {
                    // Partial match - high confidence
                    const confidence = 0.8;
                    if (confidence > highestConfidence) {
                        highestConfidence = confidence;
                        bestMatch = intent;
                    }
                } else if (patternNormalized.includes(normalizedInput)) {
                    // Reverse partial match - medium confidence
                    const confidence = 0.6;
                    if (confidence > highestConfidence) {
                        highestConfidence = confidence;
                        bestMatch = intent;
                    }
                }
            }
        }

        // Return best match if found
        if (bestMatch && highestConfidence > 0.5) {
            return {
                message: this.getRandomResponse(bestMatch.responses),
                intent: bestMatch.tag,
                confidence: highestConfidence,
                matchedPattern: "partial"
            };
        }

        // No match found - fallback response
        return {
            message: this.getFallbackResponse(),
            intent: "unknown",
            confidence: 0
        };
    }

    /**
     * Get random response from array
     * @param {Array} responses - Array of possible responses
     * @returns {string} - Selected response
     */
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * Generate fallback response for unknown inputs
     * @returns {string} - Fallback message
     */
    getFallbackResponse() {
        const fallbacks = [
            "I'm not sure I understand. Can you rephrase that?",
            "Hmm, I don't have a response for that yet. Try asking something else!",
            "I'm still learning! Ask me about my capabilities or tell me a joke.",
            "I didn't quite get that. Remember, I'm an offline demo with limited patterns."
        ];
        return this.getRandomResponse(fallbacks);
    }

    /**
     * Get system status
     * @returns {Object} - Current system information
     */
    getStatus() {
        return {
            ...this.metadata,
            lastIntent: this.lastIntent,
            confidence: this.confidence,
            conversationLength: this.conversationHistory.length
        };
    }

    /**
     * Clear conversation history
     */
    clearHistory() {
        this.conversationHistory = [];
        this.lastIntent = null;
        this.confidence = 0;
    }
}

// Export singleton instance
export const engine = new SaraEngine();
