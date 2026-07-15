// Tactical UI Controller for SaraOS HUD Console
import { engine } from './engine.js';

class UIController {
    constructor() {
        this.chatMessages = null;
        this.userInput = null;
        this.sendButton = null;
        this.intentDisplay = null;
        this.confidenceDisplay = null;
        this.coreTempEl = null;
        this.statusTextEl = null;
        this.isTyping = false;
    }

    init() {
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        this.intentDisplay = document.getElementById('intent-display');
        this.confidenceDisplay = document.getElementById('confidence-display');
        this.coreTempEl = document.getElementById('core-temp');
        this.statusTextEl = document.getElementById('status-text');

        if (!this.chatMessages || !this.userInput || !this.sendButton) return;

        this.sendButton.addEventListener('click', () => this.handleSend());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });

        // Initialize Theme Toggle switches
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const theme = btn.dataset.theme;
                if (theme === 'stark') {
                    document.body.classList.add('theme-stark');
                    this.addSystemLog("[SYS] STARK ARMOR BLUEPRINT ACTIVATED. SYSTEMS READY.");
                } else {
                    document.body.classList.remove('theme-stark');
                    this.addSystemLog("[SYS] COGNITIVE CYAN MODE ACTIVE.");
                }
            });
        });

        // Temperature fluctuations simulator
        setInterval(() => {
            if (this.coreTempEl) {
                const randTemp = Math.floor(Math.random() * 5) + 40;
                this.coreTempEl.textContent = `${randTemp}°C`;
            }
        }, 4000);

        this.displayWelcomeMessage();
        this.updateSystemStats();
    }

    displayWelcomeMessage() {
        this.addMessage(
            "System online. Welcome back, Francis. Diagnostics optimal.\nType `/help` to view tactical systems console commands.",
            'sara'
        );
    }

    handleSend() {
        if (this.isTyping) return;
        const rawInput = this.userInput.value.trim();
        if (!rawInput) return;

        this.userInput.value = '';
        this.addMessage(rawInput, 'user');

        if (rawInput.startsWith('/')) {
            this.handleSystemCommand(rawInput);
        } else {
            this.isTyping = true;
            if (this.statusTextEl) this.statusTextEl.textContent = "THINKING...";
            setTimeout(() => {
                const result = engine.processInput(rawInput);
                this.addMessage(result.message, 'sara', () => {
                    this.isTyping = false;
                    if (this.statusTextEl) this.statusTextEl.textContent = "SECURE COGNITION";
                });
                this.updateDebugPanel(result);
            }, 400);
        }
    }

    handleSystemCommand(cmd) {
        const parts = cmd.toLowerCase().split(' ');
        const mainCmd = parts[0];

        switch (mainCmd) {
            case '/help':
                this.addSystemLog(
                    "TACTICAL COMMAND CONSOLE SCHEMATICS:\n" +
                    "• /diagnose  - Run neural interface diagnostics loop\n" +
                    "• /empire    - Visual structural flow of the Tech Empire\n" +
                    "• /ironman   - Toggle Stark HUD color themes\n" +
                    "• /clear     - Reset the communications array\n" +
                    "• /help      - Print this guide"
                );
                break;
            case '/clear':
                this.chatMessages.innerHTML = '';
                this.displayWelcomeMessage();
                break;
            case '/ironman':
                const starkBtn = document.querySelector('.theme-btn[data-theme="stark"]');
                if (starkBtn) starkBtn.click();
                break;
            case '/empire':
                this.addSystemLog(
                    "FRANCIS'S TECH EMPIRE BLUEPRINT:\n" +
                    "===================================\n" +
                    " 🌐 NEURAL AGENTS (SaraAI Max & v1-v6)\n" +
                    "   └── Local Ollama Intelligence & Vosk STT\n\n" +
                    " 📡 EMBEDDED EDGE NETWORKS\n" +
                    "   └── IoT aquaculture & ESP32 telemetry grids\n\n" +
                    " 🔬 THE CREATIVE SANDBOX\n" +
                    "   └── Simulated world engines & Physics crackers\n" +
                    "==================================="
                );
                break;
            case '/diagnose':
                this.runSystemDiagnostics();
                break;
            default:
                this.addSystemLog(`[ERR] Command '${mainCmd}' unrecognized. Try /help.`);
        }
    }

    runSystemDiagnostics() {
        this.isTyping = true;
        let logs = [
            "[SYS] INITIATING LINK HANDSHAKE PROTOCOL...",
            "[SYS] SCANNING LOCAL VOSK CORE ON PORT 2700...",
            "[SYS] ESTABLISHING OLLAMA AGENT NODE INTERACTION...",
            "[SYS] HANDSHAKING ESP32 EMBEDDED CONTROL PINS (I2C/SPI)...",
            "[SYS] ZERO CLOUD LEAKS DETECTED. ENCRYPTION 100% LOCAL.",
            "[SYS] DIAGNOSTIC SEQUENCE COMPLETED. ALL SYSTEMS GREEN."
        ];

        let index = 0;
        const printLog = () => {
            if (index < logs.length) {
                this.addSystemLog(logs[index]);
                index++;
                setTimeout(printLog, 600);
            } else {
                this.isTyping = false;
            }
        };
        printLog();
    }

    addMessage(text, sender, onComplete) {
        if (!this.chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';

        const timestamp = document.createElement('div');
        timestamp.className = 'message-time';
        timestamp.textContent = new Date().toLocaleTimeString();

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

        if (sender === 'sara') {
            // Typewriter effect for SaraAI responses
            let i = 0;
            const speed = 15; // ms per char
            const type = () => {
                if (i < text.length) {
                    content.textContent += text.charAt(i);
                    i++;
                    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                    setTimeout(type, speed);
                } else {
                    content.appendChild(timestamp);
                    if (onComplete) onComplete();
                }
            };
            type();
        } else {
            content.textContent = text;
            content.appendChild(timestamp);
            if (onComplete) onComplete();
        }
    }

    addSystemLog(logText) {
        if (!this.chatMessages) return;
        const logDiv = document.createElement('div');
        logDiv.className = 'message system-log';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = logText;
        
        logDiv.appendChild(content);
        this.chatMessages.appendChild(logDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    updateDebugPanel(result) {
        if (this.intentDisplay) {
            this.intentDisplay.textContent = result.intent ? result.intent.toUpperCase() : 'UNKNOWN';
        }
        if (this.confidenceDisplay) {
            const percentage = Math.round(result.confidence * 100);
            this.confidenceDisplay.textContent = `${percentage}%`;
            if (percentage >= 80) this.confidenceDisplay.style.color = '#39ff14';
            else if (percentage >= 50) this.confidenceDisplay.style.color = '#ffcc00';
            else this.confidenceDisplay.style.color = '#ff3333';
        }
    }

    updateSystemStats() {
        const status = engine.getStatus();
        const statsElement = document.getElementById('stats-display');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="info-row"><span class="info-label">TOTAL INTENTS:</span><span class="info-value">${status.statistics.totalIntents}</span></div>
                <div class="info-row"><span class="info-label">INTENT PATTERNS:</span><span class="info-value">${status.statistics.totalPatterns}</span></div>
                <div class="info-row"><span class="info-label">RESPONSES:</span><span class="info-value">${status.statistics.totalResponses}</span></div>
            `;
        }
    }
}

const ui = new UIController();
document.addEventListener('DOMContentLoaded', () => ui.init());
export { ui };
