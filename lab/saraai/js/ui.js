// UI Controller - Handles chat interface interactions
import { engine } from './engine.js';

class UIController {
    constructor() {
        this.chatMessages = null;
        this.userInput = null;
        this.sendButton = null;
        this.statusIndicator = null;
        this.intentDisplay = null;
        this.confidenceDisplay = null;
    }

    /**
     * Initialize UI elements and event listeners
     */
    init() {
        // Get DOM elements
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        this.statusIndicator = document.getElementById('status-indicator');
        this.intentDisplay = document.getElementById('intent-display');
        this.confidenceDisplay = document.getElementById('confidence-display');

        // Set up event listeners
        this.sendButton.addEventListener('click', () => this.handleSend());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSend();
            }
        });

        // Display welcome message
        this.displayWelcomeMessage();

        // Update system status
        this.updateSystemStatus();
    }

    /**
     * Display welcome message on load
     */
    displayWelcomeMessage() {
        this.addMessage(
            "Hello! I'm SaraAI, an offline AI behavior simulator. Ask me anything!",
            'sara'
        );
    }

    /**
     * Handle send button click
     */
    handleSend() {
        const userMessage = this.userInput.value.trim();

        if (!userMessage) return;

        // Display user message
        this.addMessage(userMessage, 'user');

        // Clear input
        this.userInput.value = '';

        // Process with engine
        setTimeout(() => {
            const result = engine.processInput(userMessage);

            // Display Sara's response
            this.addMessage(result.message, 'sara');

            // Update debug panel
            this.updateDebugPanel(result);
        }, 300); // Small delay for natural feel
    }

    /**
     * Add message to chat window
     * @param {string} message - Message text
     * @param {string} sender - 'user' or 'sara'
     */
    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = message;

        const timestamp = document.createElement('div');
        timestamp.className = 'message-time';
        timestamp.textContent = new Date().toLocaleTimeString();

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        content.appendChild(timestamp);

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    /**
     * Update debug panel with intent info
     * @param {Object} result - Engine result
     */
    updateDebugPanel(result) {
        if (this.intentDisplay) {
            this.intentDisplay.textContent = result.intent || 'unknown';
        }

        if (this.confidenceDisplay) {
            const percentage = Math.round(result.confidence * 100);
            this.confidenceDisplay.textContent = `${percentage}%`;

            // Color coding
            if (percentage >= 80) {
                this.confidenceDisplay.style.color = '#4ade80';
            } else if (percentage >= 50) {
                this.confidenceDisplay.style.color = '#fbbf24';
            } else {
                this.confidenceDisplay.style.color = '#f87171';
            }
        }
    }

    /**
     * Update system status display
     */
    updateSystemStatus() {
        const status = engine.getStatus();

        if (this.statusIndicator) {
            this.statusIndicator.innerHTML = `
        <span class="status-dot"></span>
        <span>SYSTEM: ${status.status}</span>
        <span class="status-divider">|</span>
        <span>MODE: ${status.mode}</span>
      `;
        }

        // Update stats if elements exist
        const statsElement = document.getElementById('stats-display');
        if (statsElement) {
            statsElement.innerHTML = `
        <div>Intents: ${status.statistics.totalIntents}</div>
        <div>Patterns: ${status.statistics.totalPatterns}</div>
        <div>Responses: ${status.statistics.totalResponses}</div>
      `;
        }
    }
}

// Initialize on DOM load
const ui = new UIController();

document.addEventListener('DOMContentLoaded', () => {
    ui.init();
});

export { ui };
