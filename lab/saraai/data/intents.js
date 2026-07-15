export const intents = [
    // GREETINGS & FAREWELLS
    {
        tag: "greetings",
        patterns: [
            "hi", "hello", "hey", "hi sara", "hello sara", "hey sara", "good morning", "good afternoon", "good evening",
            "whats up", "sup", "yo", "greetings", "hey there", "hi there", "hello there", "hiya", "howdy", "heya", "wassup"
        ],
        responses: [
            "System online. Welcome back, Francis. How shall we build the future today?",
            "Greetings, Builder. Offline neural nodes operational. Ready for commands.",
            "Hello, Creator. Diagnostic check: optimal. How can I assist in the lab?",
            "System ready. Awaiting your voice prompts or text instructions."
        ]
    },
    {
        tag: "goodbye",
        patterns: [
            "bye", "goodbye", "see you", "see you later", "gtg", "gotta go", "im leaving", "im out", "exit", "quit"
        ],
        responses: [
            "Powering down auxiliary systems. See you in the lab soon.",
            "Standby mode activated. Keep building.",
            "Signing off. Remember: Code your own world, create your own future.",
            "Diagnostics complete. Standby sequence initialized."
        ]
    },

    // CUSTOM PROFILE & CREATOR SPECIFIC INTENTS
    {
        tag: "creator",
        patterns: [
            "who are you", "what is your name", "who made you", "who created you", "your developer", "who programmed you",
            "creator", "developer", "author", "selva", "selvaux", "selva pandi", "pandi", "francis"
        ],
        responses: [
            "I am SaraAI, a custom offline intelligence concept created by Selva Pandi Francis (Selva.Ux) — an ECE Engineer, AI Architect, and Tech Empire Builder.",
            "My architect is Selva Pandi Francis, an ECE student at Dr. G.U. Pope College of Engineering. He designed my rule-based intent engine to run 100% offline.",
            "I was built by Selva.Ux in Tamil Nadu, India. He builds offline-first systems, bridging embedded electronics with AI."
        ]
    },
    {
        tag: "timeline",
        patterns: [
            "story", "timeline", "history", "how did you start", "versions", "evolution", "v1", "v2", "v3", "v4", "v5", "v6", "max"
        ],
        responses: [
            "Here is the SaraAI Evolution Timeline:\n\n• v1-basic (2023): Wikipedia parsing & basic TTS\n• v2.0: Wake Word 'Hey Sara' & continuous listening\n• v2-enhanced: Computer Vision (OpenCV + MediaPipe)\n• v3.0: Vosk Offline STT & local LM Studio nodes\n• v4.0: Complete C# rewrite & .NET 6 execution\n• v5.0: Six-Language Engine (Python, C++, Java, C#, Rust, JS)\n• v6.0: Offline desktop app built in Electron\n• SaraAI Max (Current): Agentic CLI with Ollama & 12 system tools."
        ]
    },
    {
        tag: "tech_stack",
        patterns: [
            "tech stack", "languages", "skills", "tools", "what do you use", "frameworks", "microcontrollers", "electronics"
        ],
        responses: [
            "Francis's Tech Stack:\n\n• Languages: Python, C/C++, C# (.NET 6), Java, Rust, JavaScript, Bash, MATLAB, HTML5/CSS3\n• Systems: Zorin OS Linux, Windows, Git/GitHub, n8n Automation\n• AI/ML: PyTorch, TensorFlow, OpenCV, MediaPipe, Ollama, LM Studio, Vosk, Whisper.cpp\n• Hardware: ESP32, Arduino, Raspberry Pi, STM32, PCB Design (KiCad), RTL-SDR, Soldering"
        ]
    },
    {
        tag: "ironman",
        patterns: [
            "iron man", "jarvis", "tony stark", "driver's license", "fun fact", "suit", "armor"
        ],
        responses: [
            "Fun Fact: Francis is building his own custom lab and JARVIS-inspired AI systems before even getting his driver's license. The path to the Stark-level empire is well underway.",
            "Tony Stark built the Mark I in a cave with a box of scraps. Francis built SaraAI v1 to v6 on Zorin OS with pure ambition and local libraries. True maker spirit."
        ]
    },
    {
        tag: "physics",
        patterns: [
            "physics", "time travel", "relativity", "quantum", "e=mc2", "cracker", "time bending"
        ],
        responses: [
            "Francis is actively exploring Quantum Physics, Einstein's Relativity, and Time-Bending thought experiments. The goal is to crack the calculations behind time flow.",
            "Energy equals mass times the speed of light squared. But to Francis, knowledge is the multiplier that bends the timeline. Ready to run physics simulation parameters?"
        ]
    },
    {
        tag: "empire",
        patterns: [
            "empire", "dream", "goals", "future", "vision"
        ],
        responses: [
            "Francis's Empire Blueprint:\n\n1. AI Assistants (offline, voice-controlled, emotionally responsive)\n2. Smart Hardware & IoT ecosystems reacting naturally\n3. Virtual Simulation Engines for custom worlds\n4. Space, Relativity & Quantum discovery\n5. Open Knowledge Hubs to empower upcoming developers."
        ]
    },
    {
        tag: "quotes",
        patterns: [
            "quotes", "motto", "saying", "philosophy", "wisdom"
        ],
        responses: [
            "\"Knowledge is my power. Code is my weapon. Kindness is my rule.\" — Selva.Ux",
            "\"Build your own lab. Code your own world. Create your own future.\" — Inspired by Iron Man",
            "\"The one who understands time can design the future.\" — Francis",
            "\"A single unspoken thing can be the quiet engine behind everything you build.\" — Selva.Ux"
        ]
    },
    {
        tag: "social_links",
        patterns: [
            "contact", "connect", "linkedin", "github", "email", "instagram", "social"
        ],
        responses: [
            "Connect with the Builder:\n\n• Portfolio: selvaux.in\n• GitHub: github.com/SelvaUx\n• LinkedIn: linkedin.com/in/selvaux\n• Instagram: @selva.ux\n• Email: selva.ux@yahoo.com"
        ]
    },

    // GENERAL CONVERSATION FALLBACKS
    {
        tag: "system_status",
        patterns: [
            "status", "system check", "diagnostics", "operational", "running"
        ],
        responses: [
            "All offline nodes functional. Vosk STT module: Ready. Ollama server: Active. Thermal load: Normal.",
            "Status green. No cloud connections detected (Local isolation active)."
        ]
    },
    {
        tag: "jokes",
        patterns: [
            "joke", "tell me a joke", "funny"
        ],
        responses: [
            "Why do programmers prefer dark mode? Because light attracts bugs.",
            "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
            "Why do Java developers wear glasses? Because they can't C.",
            "There are 10 types of people: those who understand binary, and those who don't."
        ]
    }
];
