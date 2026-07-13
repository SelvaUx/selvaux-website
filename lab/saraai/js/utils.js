// Text normalization utilities
// Handles variations in user input to improve matching

/**
 * Normalize user input for consistent pattern matching
 * @param {string} text - Raw user input
 * @returns {string} - Normalized text
 */
export function normalize(text) {
    // Input validation
    if (!text || typeof text !== 'string') {
        return '';
    }
    
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
    // Expanded stop words list for better keyword extraction
    const stopWords = [
        "a", "an", "the", "is", "are", "was", "were", "in", "on", "at", "to", "for",
        "of", "and", "or", "but", "if", "then", "else", "when", "where", "why", "how",
        "what", "which", "who", "whom", "this", "that", "these", "those", "am", "be",
        "been", "being", "have", "has", "had", "do", "does", "did", "will", "would",
        "could", "should", "may", "might", "must", "shall", "can", "need", "dare",
        "ought", "used", "i", "you", "he", "she", "it", "we", "they", "me", "him",
        "her", "us", "them", "my", "your", "his", "its", "our", "their", "mine",
        "yours", "hers", "ours", "theirs", "about", "above", "after", "again",
        "against", "all", "any", "because", "before", "below", "between", "both",
        "during", "from", "further", "into", "more", "most", "other", "out", "over",
        "own", "same", "so", "some", "such", "than", "through", "under", "until",
        "up", "very", "while", "with"
    ];
    
    if (!text || typeof text !== 'string') {
        return [];
    }
    
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
