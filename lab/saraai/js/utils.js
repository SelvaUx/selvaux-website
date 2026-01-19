// Text normalization utilities
// Handles variations in user input to improve matching

/**
 * Normalize user input for consistent pattern matching
 * @param {string} text - Raw user input
 * @returns {string} - Normalized text
 */
export function normalize(text) {
    return text
        .toLowerCase()                    // Convert to lowercase
        .replace(/[^a-z\s]/g, "")        // Remove punctuation
        .replace(/\s+/g, " ")            // Normalize whitespace
        .trim();                         // Remove leading/trailing spaces
}

/**
 * Extract keywords from normalized text
 * @param {string} text - Normalized text
 * @returns {Array} - Array of keywords
 */
export function extractKeywords(text) {
    const stopWords = ["a", "an", "the", "is", "are", "was", "were", "in", "on", "at", "to", "for"];
    return text
        .split(" ")
        .filter(word => word.length > 2 && !stopWords.includes(word));
}

/**
 * Calculate similarity between two strings (simple implementation)
 * @param {string} str1 
 * @param {string} str2 
 * @returns {number} - Similarity score (0-1)
 */
export function calculateSimilarity(str1, str2) {
    const words1 = new Set(str1.split(" "));
    const words2 = new Set(str2.split(" "));

    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
}
