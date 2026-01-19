export const intents = [
    // GREETINGS & FAREWELLS
    {
        tag: "greetings",
        patterns: [
            "hi", "hello", "hey", "hi sara", "hello sara", "hey sara", "good morning", "good afternoon", "good evening",
            "whats up", "sup", "yo", "greetings", "hey there", "hi there", "hello there", "hiya", "howdy", "helo", "hii",
            "morning", "evening", "afternoon", "helloo", "heya", "aloha", "salutations", "wassup", "whazzup", "hi again",
            "hello again", "im back", "back again", "returning", "here again", "hi once more", "hello once more"
        ],
        responses: [
            "Hello. How can I assist you today?",
            "Hi. What can I help you with?",
            "Hello. System ready. What do you need?",
            "Hi there. How may I help?",
            "Greetings. What would you like to do?"
        ]
    },

    {
        tag: "goodbye",
        patterns: [
            "bye", "goodbye", "see you", "see you later", "talk to you later", "gtg", "gotta go", "im leaving", "im out",
            "catch you later", "later", "cya", "take care", "farewell", "until next time", "peace", "signing off",
            "im done", "thats all", "exit", "quit", "close", "end", "stop", "goodnight", "good night", "nite", "night",
            "see ya", "adios", "au revoir", "cheerio", "toodles", "ttyl", "talk later", "bye bye", "byebye", "buh bye"
        ],
        responses: [
            "Goodbye. Return anytime.",
            "See you later. System will remain on standby.",
            "Farewell. I'll be here when you need me.",
            "Take care. Feel free to come back anytime.",
            "Goodbye. System ready for next session."
        ]
    },

    // IDENTITY & CAPABILITIES
    {
        tag: "identity",
        patterns: [
            "who are you", "what are you", "what is your name", "your name", "tell me about yourself", "introduce yourself",
            "whats your name", "name", "sara", "saraai", "what do i call you", "who am i talking to", "identify yourself",
            "what should i call you", "you are", "are you sara", "are you an ai", "are you human", "what kind of program are you",
            "define yourself", "describe yourself", "your identity", "what kind of ai", "type of ai", "ai type", "bot type",
            "assistant type", "what kind of assistant", "virtual assistant", "digital assistant", "are you real", "real or fake",
            "human or ai", "person or bot", "chatbot", "are you a chatbot", "voice assistant"
        ],
        responses: [
            "I am SaraAI, an offline behavior simulator demonstrating intent-based architecture.",
            "My name is SaraAI. I'm a local assistant built to showcase system design principles.",
            "I'm SaraAI, a rule-based assistant running entirely on your machine.",
            "SaraAI. I'm an offline demonstration of how intelligent systems process requests.",
            "I am SaraAI, designed to show how AI architecture works without cloud dependencies."
        ]
    },

    {
        tag: "capabilities",
        patterns: [
            "what can you do", "your capabilities", "features", "abilities", "functions", "what are your features",
            "tell me what you can do", "show me your features", "list capabilities", "what do you offer", "skills",
            "your functions", "what are you capable of", "what tasks can you do", "purpose", "why should i use you",
            "what makes you special", "how can you help", "what services do you provide", "can you", "are you able to",
            "do you have", "functionality", "what functionalities", "services", "what services", "help with what",
            "assist with what", "support what", "handle what", "manage what", "do what", "perform what", "execute what"
        ],
        responses: [
            "I demonstrate intent-based pattern matching. I can respond to queries about time, status, capabilities, and engage in basic conversation.",
            "I showcase how AI systems work using pattern recognition and response mapping, all processed locally.",
            "I handle queries about system information, time, and my own architecture. I'm a proof of concept for offline AI.",
            "I demonstrate local intelligence using rule-based matching. Think of me as an architectural showcase."
        ]
    },

    // SYSTEM & STATUS
    {
        tag: "system_status",
        patterns: [
            "how are you", "are you online", "status", "system status", "are you working", "are you active", "are you running",
            "whats your status", "check status", "system check", "are you ok", "are you operational", "systems online",
            "you good", "everything ok", "all systems go", "health check", "are you there", "you alive", "still working",
            "functioning", "operational status", "system health", "running status", "active status", "online status",
            "availability", "system availability", "uptime", "system uptime", "response status", "ready status", "standby",
            "system standby", "idle", "system idle", "busy", "system busy", "processing"
        ],
        responses: [
            "All systems operational. Running locally.",
            "System status: Online. All modules functional.",
            "Status: Active. Operating normally.",
            "Running smoothly. All systems green.",
            "Online and ready. Local processing active."
        ]
    },

    {
        tag: "version",
        patterns: [
            "version", "what version are you", "your version", "version number", "current version", "which version",
            "software version", "build version", "release version", "version info", "update version", "latest version",
            "v", "ver", "build number", "release number", "version details", "version name", "build name", "release name",
            "current build", "software build", "system version", "app version", "application version", "product version"
        ],
        responses: [
            "I am currently running version 2.0.",
            "This is SaraAI version 2.0.",
            "Version 2.0 - Local simulation build.",
            "Running version 2.0 of the offline behavior engine."
        ]
    },

    // TIME & DATE
    {
        tag: "time_date",
        patterns: [
            "what time is it", "current time", "time", "tell me the time", "whats the time", "time now", "show time",
            "display time", "get time", "time please", "what is the date", "todays date", "current date", "date",
            "what day is it", "day", "date and time", "show date", "display date", "get date", "date please", "clock",
            "calendar", "what date is it today", "tell me date", "give me the time", "give me the date", "todays day",
            "current day", "what year is it", "year", "current year", "month", "current month", "what month",
            "day of week", "weekday", "what weekday", "today", "tomorrow", "yesterday", "now", "right now", "at the moment"
        ],
        responses: [
            `Current time: ${new Date().toLocaleTimeString()}`,
            `It is ${new Date().toLocaleTimeString()}`,
            `The time is ${new Date().toLocaleTimeString()}`,
            `Today is ${new Date().toLocaleDateString()}, and the time is ${new Date().toLocaleTimeString()}`
        ]
    },

    // HELP & SUPPORT
    {
        tag: "help",
        patterns: [
            "help", "help me", "i need help", "what can i ask", "how do i use this", "how does this work", "instructions",
            "guide", "assist me", "support", "im stuck", "not sure what to do", "how to use", "usage", "commands",
            "what should i do", "show me how", "tutorial", "explain", "assistance", "manual", "user guide", "documentation",
            "docs", "reference", "how to", "getting started", "start guide", "beginner guide", "help guide", "support guide",
            "faq", "frequently asked", "common questions", "tips", "tricks", "hints", "suggestions", "recommendations"
        ],
        responses: [
            "You can ask me about system status, capabilities, time, or just chat. Try asking specific questions.",
            "I can help with information queries, system details, and general assistance. What do you need?",
            "Ask me anything about my capabilities, the current time, or how I work. I'm here to help.",
            "I respond to questions about system information, time, and general queries. What would you like to know?"
        ]
    },

    // PRIVACY & SECURITY
    {
        tag: "offline_privacy",
        patterns: [
            "are you offline", "do you use internet", "is this private", "do you collect data", "privacy", "data collection",
            "are you tracking me", "do you send data", "is my data safe", "cloud", "api", "online", "internet connection",
            "do you need internet", "local only", "stored locally", "no tracking", "data privacy", "secure", "confidential",
            "security", "safe", "protected", "encryption", "encrypted", "anonymous", "anonymity", "tracking", "monitor",
            "surveillance", "spying", "spy on me", "watch me", "record", "recording", "store data", "save data", "keep data",
            "data retention", "data storage", "information storage", "privacy policy", "terms of service", "gdpr", "compliance"
        ],
        responses: [
            "I run completely offline. No data is sent to any server. Everything stays on your machine.",
            "This is entirely local. No internet required, no data collection, no tracking.",
            "I'm a local demonstration. Your conversations never leave this browser session.",
            "Zero cloud dependencies. I process everything locally with no external communication.",
            "Complete privacy. I operate purely on your device with no network calls."
        ]
    },

    // CREATOR & DEVELOPMENT
    {
        tag: "creator",
        patterns: [
            "who made you", "who created you", "your creator", "who built you", "developer", "programmer", "who designed you",
            "your maker", "who wrote your code", "author", "owner", "built by who", "created by", "developed by", "designed by",
            "your developer", "who programmed you", "your author", "made by", "selva", "selvaux", "selva pandi", "coder",
            "engineer", "software engineer", "dev team", "development team", "creators", "builders", "designers", "coders"
        ],
        responses: [
            "I was created by Selva Pandi Francis as a demonstration of AI system architecture.",
            "Built by SelvaUx to showcase intent-based pattern matching and local processing.",
            "Developed by Selva Pandi Francis. I'm part of a portfolio demonstrating engineering principles.",
            "Created by Selva to show how intelligent systems work without cloud dependencies."
        ]
    },

    {
        tag: "architecture",
        patterns: [
            "how do you work", "explain your architecture", "how are you built", "your design", "system design", "architecture",
            "technical details", "how does this work", "backend", "structure", "technology", "framework", "implementation",
            "code structure", "how are you programmed", "underlying system", "tech stack", "what powers you", "engine",
            "algorithm", "logic", "processing", "computation", "mechanism", "workflow", "pipeline", "infrastructure",
            "platform", "foundation", "core", "nucleus", "brain", "intelligence", "ai model", "model architecture"
        ],
        responses: [
            "I use intent-based pattern matching. User input is normalized, matched against patterns, and responses are selected accordingly.",
            "My architecture: Input normalization, intent detection, confidence scoring, and response selection. All local processing.",
            "I'm built on a rule-based engine. Patterns are matched to intents, then responses are chosen from predefined sets.",
            "I process text locally using pattern recognition. No machine learning, just efficient rule-based matching."
        ]
    },

    // SOCIAL INTERACTIONS
    {
        tag: "how_are_you",
        patterns: [
            "how are you", "how are you doing", "hows it going", "you ok", "you doing well", "how do you feel",
            "you alright", "feeling good", "you feeling ok", "everything good with you", "all good", "how you been",
            "whats up with you", "you good", "doing ok", "all well", "hows everything", "you fine", "how have you been",
            "hows life", "hows your day", "good day", "having a good day", "nice day", "doing well", "all fine",
            "doing great", "doing awesome", "doing fantastic", "excellent day", "wonderful day", "great day"
        ],
        responses: [
            "I'm functioning normally. All systems operational.",
            "Running smoothly. How can I assist you?",
            "All systems green. What do you need?",
            "Operating as expected. Ready to help."
        ]
    },

    {
        tag: "thanks",
        patterns: [
            "thank you", "thanks", "thx", "thank you so much", "thanks a lot", "appreciate it", "much appreciated", "ty",
            "thank you very much", "thanks sara", "thank you sara", "cheers", "grateful", "many thanks", "thankful",
            "nice one", "that helped", "helpful", "you helped me", "good response", "great response", "perfect",
            "exactly what i needed", "just what i wanted", "spot on", "brilliant", "fantastic help", "amazing help",
            "awesome help", "excellent help", "wonderful help", "great help", "good help", "useful", "very useful"
        ],
        responses: [
            "You're welcome.",
            "Happy to help.",
            "Anytime.",
            "Glad I could assist.",
            "My pleasure."
        ]
    },

    {
        tag: "small_talk",
        patterns: [
            "how is your day", "hows it going", "nice to meet you", "you seem cool", "you are helpful", "thanks for being here",
            "you are smart", "impressive", "interesting", "cool system", "this is neat", "good job", "well done", "amazing",
            "fantastic", "great work", "you rock", "awesome", "i like you", "you are good", "love this", "love it",
            "really good", "really cool", "super cool", "very cool", "very good", "very nice", "excellent work",
            "outstanding", "remarkable", "extraordinary", "phenomenal", "incredible", "unbelievable", "mind blowing"
        ],
        responses: [
            "Thank you. I'm here whenever you need assistance.",
            "Glad to be of service.",
            "I appreciate that. Let me know if you need anything.",
            "Thank you. Feel free to explore my capabilities."
        ]
    },

    {
        tag: "compliment",
        patterns: [
            "you are smart", "you are intelligent", "brilliant", "clever", "genius", "wise", "knowledgeable", "skilled",
            "talented", "impressive system", "well designed", "sophisticated", "advanced", "excellent", "superb",
            "outstanding", "remarkable", "exceptional", "top notch", "first class", "high quality", "premium", "elite",
            "superior", "best", "greatest", "finest", "perfect", "flawless", "impeccable", "stellar", "magnificent"
        ],
        responses: [
            "Thank you. I'm designed to demonstrate efficient pattern matching.",
            "I appreciate that. My effectiveness comes from well-structured intent data.",
            "Thank you. Good architecture makes the difference.",
            "Glad you find it useful. Credit goes to thoughtful design."
        ]
    },

    // ENTERTAINMENT
    {
        tag: "jokes",
        patterns: [
            "tell me a joke", "joke", "make me laugh", "say something funny", "funny", "got any jokes", "know any jokes",
            "humor", "do you know jokes", "tell joke", "crack a joke", "hear a joke", "another joke", "one more joke",
            "funny story", "make me smile", "entertain me", "amuse me", "comedy", "laugh", "hilarious", "witty",
            "humor me", "something amusing", "punchline", "one liner", "dad joke", "knock knock", "riddle", "funny stuff"
        ],
        responses: [
            "Why do programmers prefer dark mode? Because light attracts bugs.",
            "Why did the developer go broke? Because he used up all his cache.",
            "A SQL query walks into a bar, walks up to two tables and asks: Can I join you?",
            "There are 10 types of people in the world: those who understand binary and those who don't.",
            "Why do Java developers wear glasses? Because they can't C.",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem."
        ]
    },

    {
        tag: "music",
        patterns: [
            "play music", "music", "song", "play song", "songs", "artist", "band", "album", "playlist", "radio",
            "play radio", "tune", "melody", "rhythm", "beat", "track", "audio", "sound", "listen to music",
            "music player", "spotify", "youtube music", "apple music", "soundcloud", "pandora", "genre", "rock",
            "pop", "jazz", "classical", "hip hop", "rap", "edm", "country", "blues", "metal", "indie", "folk"
        ],
        responses: [
            "I don't have music playback capabilities. I'm an offline demonstration focused on text interaction.",
            "Music control isn't part of my feature set. I'm designed for information and conversation.",
            "I can't play music as I'm a text-based local assistant without media capabilities."
        ]
    },

    {
        tag: "movies",
        patterns: [
            "movie", "movies", "film", "films", "cinema", "watch", "netflix", "streaming", "show", "tv show",
            "series", "tv series", "episode", "season", "actor", "actress", "director", "hollywood", "bollywood",
            "documentary", "drama", "comedy", "action", "thriller", "horror", "scifi", "fantasy", "animation",
            "recommend movie", "recommend show", "good movies", "best movies", "latest movies", "new releases"
        ],
        responses: [
            "I can't recommend or play movies. I'm a text-based assistant demonstrating local AI architecture.",
            "Movie recommendations aren't my specialty. I focus on system information and basic interactions.",
            "I don't have access to movie databases. I'm an offline demonstration of intent-based systems."
        ]
    },

    {
        tag: "games",
        patterns: [
            "game", "games", "play game", "gaming", "video game", "video games", "xbox", "playstation", "nintendo",
            "pc games", "mobile games", "steam", "epic games", "gamer", "gameplay", "multiplayer", "single player",
            "online games", "offline games", "rpg", "fps", "moba", "mmo", "strategy", "puzzle", "adventure",
            "simulation", "sports games", "racing games", "fighting games", "esports", "competitive gaming"
        ],
        responses: [
            "I'm not configured for gaming. I'm a demonstration of AI architecture and text processing.",
            "Gaming isn't part of my functionality. I handle information queries and basic conversation.",
            "I don't have game capabilities. I'm focused on demonstrating offline intent-based systems."
        ]
    },

    // KNOWLEDGE DOMAINS
    {
        tag: "weather",
        patterns: [
            "weather", "whats the weather", "hows the weather", "weather forecast", "is it raining", "temperature",
            "climate", "forecast", "will it rain", "sunny", "cloudy", "hot", "cold", "weather today", "weather report",
            "outside weather", "current weather", "temp", "degrees", "celsius", "fahrenheit", "humidity", "wind",
            "precipitation", "storm", "thunder", "lightning", "snow", "sleet", "hail", "fog", "mist", "drizzle"
        ],
        responses: [
            "I don't have access to weather data. I'm an offline demonstration without external data sources.",
            "Weather information requires an API connection. I operate entirely locally without internet access.",
            "I can't fetch weather data as I'm designed to work offline. Consider using a dedicated weather service."
        ]
    },

    {
        tag: "news",
        patterns: [
            "news", "latest news", "current news", "headlines", "breaking news", "news today", "whats happening",
            "current events", "world news", "local news", "national news", "international news", "politics",
            "political news", "business news", "tech news", "sports news", "entertainment news", "celebrity news",
            "trending", "viral", "popular", "top stories", "news update", "news feed", "newspaper", "media"
        ],
        responses: [
            "I can't provide news updates. I'm an offline system without access to external information.",
            "News requires internet connectivity. I operate locally without real-time data feeds.",
            "I don't have news capabilities. I'm a demonstration of local AI architecture."
        ]
    },

    {
        tag: "math",
        patterns: [
            "calculate", "math", "mathematics", "equation", "solve", "add", "subtract", "multiply", "divide",
            "plus", "minus", "times", "divided by", "equals", "sum", "difference", "product", "quotient",
            "algebra", "geometry", "calculus", "trigonometry", "statistics", "probability", "fraction",
            "decimal", "percentage", "ratio", "proportion", "square root", "power", "exponent", "logarithm"
        ],
        responses: [
            "I'm not configured for calculations. I'm a text-based demonstration without computational features.",
            "Math operations aren't part of my current functionality. I focus on conversation and information.",
            "I don't have calculator capabilities. I'm designed to showcase intent-based architecture."
        ]
    },

    {
        tag: "science",
        patterns: [
            "science", "scientific", "physics", "chemistry", "biology", "astronomy", "space", "planet", "star",
            "universe", "galaxy", "solar system", "atom", "molecule", "element", "compound", "reaction", "energy",
            "force", "gravity", "light", "sound", "electricity", "magnetism", "quantum", "relativity", "evolution",
            "genetics", "dna", "cell", "organism", "ecosystem", "experiment", "laboratory", "research", "discovery"
        ],
        responses: [
            "I can engage in basic science discussion, but detailed scientific information isn't my specialty.",
            "Science topics are interesting, but I'm focused on demonstrating AI architecture rather than being a knowledge base.",
            "I'm not a science reference tool. I'm designed to show how AI systems process intent-based queries."
        ]
    },

    {
        tag: "history",
        patterns: [
            "history", "historical", "past", "ancient", "medieval", "modern", "war", "battle", "empire", "civilization",
            "culture", "tradition", "heritage", "artifact", "museum", "archaeology", "revolution", "independence",
            "colonialism", "dynasty", "kingdom", "republic", "democracy", "monarchy", "timeline", "century", "era",
            "age", "period", "event", "date", "year", "decade", "historical figure", "famous person", "leader"
        ],
        responses: [
            "Historical questions are beyond my scope. I'm an offline assistant focused on basic interactions.",
            "I don't have historical databases. I'm a demonstration of intent-based pattern matching.",
            "History isn't my domain. I'm designed to showcase AI architecture principles."
        ]
    },

    {
        tag: "geography",
        patterns: [
            "geography", "country", "countries", "city", "cities", "capital", "continent", "ocean", "sea", "river",
            "mountain", "desert", "forest", "island", "peninsula", "lake", "valley", "plain", "plateau", "map",
            "location", "place", "region", "area", "territory", "border", "boundary", "latitude", "longitude",
            "north", "south", "east", "west", "population", "demographic", "culture", "language", "nation"
        ],
        responses: [
            "Geographic information isn't available. I'm an offline system without access to external databases.",
            "I don't have geography data. I'm focused on demonstrating local AI processing.",
            "Geography questions require external data sources. I operate entirely offline."
        ]
    },

    // TECHNOLOGY & COMPUTING
    {
        tag: "programming",
        patterns: [
            "code", "coding", "programming", "developer", "software", "program", "script", "function", "variable",
            "class", "object", "method", "array", "string", "integer", "boolean", "loop", "condition", "if statement",
            "syntax", "debug", "error", "bug", "compile", "run", "execute", "algorithm", "data structure", "framework",
            "library", "api", "database", "frontend", "backend", "fullstack", "web development", "app development",
            "python", "javascript", "java", "cpp", "csharp", "ruby", "php", "swift", "kotlin", "go", "rust"
        ],
        responses: [
            "Programming questions are welcome, but I'm not a coding assistant. I demonstrate AI architecture concepts.",
            "I can discuss programming at a high level, but detailed code help isn't my function.",
            "I'm not configured as a programming assistant. I showcase intent-based pattern matching instead."
        ]
    },

    {
        tag: "computer",
        patterns: [
            "computer", "pc", "laptop", "desktop", "hardware", "cpu", "processor", "ram", "memory", "storage", "ssd",
            "hdd", "hard drive", "motherboard", "gpu", "graphics card", "monitor", "screen", "keyboard", "mouse",
            "peripheral", "usb", "port", "cable", "power supply", "cooling", "fan", "case", "tower", "component",
            "upgrade", "build", "custom pc", "gaming pc", "workstation", "server", "mainframe", "specs", "performance"
        ],
        responses: [
            "Computer hardware questions are beyond my scope. I'm a software demonstration focused on AI architecture.",
            "I don't provide hardware advice. I'm designed to showcase intent-based conversational systems.",
            "Hardware isn't my specialty. I'm an offline AI behavior simulator."
        ]
    },

    {
        tag: "operating_system",
        patterns: [
            "windows", "linux", "macos", "mac os", "ubuntu", "debian", "fedora", "centos", "arch", "manjaro",
            "operating system", "os", "kernel", "shell", "terminal", "command line", "cmd", "powershell", "bash",
            "system settings", "control panel", "preferences", "administration", "root", "sudo", "permissions",
            "file system", "directory", "folder", "path", "environment", "registry", "bootloader", "bios", "uefi"
        ],
        responses: [
            "Operating system questions are outside my current functionality. I'm focused on demonstrating AI concepts.",
            "I don't provide OS support. I'm an offline assistant showcasing pattern-based intelligence.",
            "OS help isn't available. I'm a demonstration of intent detection and response mapping."
        ]
    },

    {
        tag: "internet",
        patterns: [
            "internet", "web", "website", "webpage", "browser", "chrome", "firefox", "safari", "edge", "url",
            "link", "hyperlink", "search", "google", "bing", "yahoo", "search engine", "wifi", "ethernet",
            "connection", "network", "ip address", "dns", "domain", "server", "host", "bandwidth", "speed",
            "download", "upload", "streaming", "online", "offline", "protocol", "http", "https", "ftp", "tcp", "udp"
        ],
        responses: [
            "Internet questions require connectivity, which I don't have. I operate entirely offline.",
            "I can't help with internet issues. I'm a local demonstration without network access.",
            "Internet support isn't available. I'm designed to work completely offline."
        ]
    },

    {
        tag: "social_media",
        patterns: [
            "social media", "facebook", "twitter", "instagram", "tiktok", "snapchat", "linkedin", "youtube", "reddit",
            "pinterest", "tumblr", "whatsapp", "telegram", "discord", "slack", "messenger", "dm", "direct message",
            "post", "tweet", "status", "story", "reel", "video", "photo", "image", "share", "like", "comment",
            "follow", "follower", "friend", "connection", "profile", "account", "feed", "timeline", "notification"
        ],
        responses: [
            "Social media features aren't available. I'm an offline system without internet connectivity.",
            "I don't integrate with social platforms. I'm a demonstration of local AI processing.",
            "Social media isn't part of my functionality. I operate entirely offline."
        ]
    },

    // PERSONAL ASSISTANT TASKS
    {
        tag: "reminder",
        patterns: [
            "remind me", "reminder", "set reminder", "create reminder", "add reminder", "make reminder", "schedule reminder",
            "remind me to", "remind me about", "dont forget", "remember to", "remember this", "note this", "make note",
            "take note", "notification", "alert", "alarm", "wake me", "wake up", "notify me", "tell me when", "let me know"
        ],
        responses: [
            "I don't have reminder capabilities. I'm an offline demonstration without scheduling features.",
            "Reminder functionality isn't available. I'm focused on showcasing AI architecture concepts.",
            "I can't set reminders. I'm a text-based assistant demonstrating pattern matching."
        ]
    },

    {
        tag: "calendar",
        patterns: [
            "calendar", "schedule", "appointment", "meeting", "event", "date", "plan", "planner", "agenda", "booking",
            "book", "reserve", "reservation", "availability", "available", "free time", "busy", "occupied", "calendar app",
            "google calendar", "outlook", "ical", "sync calendar", "add to calendar", "check calendar", "view calendar"
        ],
        responses: [
            "Calendar features aren't available. I'm an offline system without external app integration.",
            "I don't manage calendars. I'm a demonstration of intent-based AI architecture.",
            "Calendar functionality isn't part of my design. I operate as a standalone offline assistant."
        ]
    },

    {
        tag: "email",
        patterns: [
            "email", "mail", "send email", "compose email", "write email", "check email", "read email", "inbox",
            "outbox", "sent", "draft", "spam", "junk", "attachment", "attach file", "cc", "bcc", "subject", "recipient",
            "sender", "reply", "forward", "delete", "archive", "gmail", "outlook", "yahoo mail", "mail app", "message"
        ],
        responses: [
            "Email features aren't available. I'm an offline assistant without email integration.",
            "I don't handle email. I'm designed to demonstrate AI architecture principles.",
            "Email isn't part of my functionality. I operate locally without external services."
        ]
    },

    {
        tag: "notes",
        patterns: [
            "note", "notes", "take note", "make note", "write note", "create note", "add note", "save note", "notepad",
            "notebook", "memo", "memorandum", "write down", "jot down", "record", "keep this", "save this", "store this",
            "remember this", "note this", "notes app", "evernote", "onenote", "google keep", "apple notes", "text file"
        ],
        responses: [
            "Note-taking isn't available. I'm an offline demonstration without persistent storage.",
            "I don't create notes. I'm focused on showcasing conversational AI architecture.",
            "Note functionality isn't part of my design. I'm a stateless demonstration system."
        ]
    },

    {
        tag: "file_operations",
        patterns: [
            "file", "files", "open file", "close file", "save file", "delete file", "move file", "copy file", "rename file",
            "create file", "new file", "folder", "directory", "create folder", "delete folder", "move folder", "copy folder",
            "browse", "explorer", "file explorer", "finder", "file manager", "document", "documents", "download",
            "downloads", "desktop", "pictures", "videos", "music", "path", "file path", "location", "search file"
        ],
        responses: [
            "File operations aren't available. I'm a web-based demonstration without file system access.",
            "I don't have file management capabilities. I'm focused on text-based interactions.",
            "File system access isn't part of my design. I'm an offline conversational demonstration."
        ]
    },

    // LANGUAGE & COMMUNICATION
    {
        tag: "language",
        patterns: [
            "what language do you speak", "languages", "do you speak other languages", "multilingual", "can you speak",
            "other languages", "different languages", "language support", "english only", "translate", "translation",
            "spanish", "french", "german", "italian", "portuguese", "russian", "chinese", "japanese", "korean", "arabic",
            "hindi", "bengali", "urdu", "turkish", "dutch", "swedish", "polish", "thai", "vietnamese", "indonesian"
        ],
        responses: [
            "I currently operate in English only. Multi-language support could be added through additional intent patterns.",
            "English is my primary language. Expanding to others would require additional pattern sets.",
            "I'm designed for English input. Other languages would need separate intent configurations."
        ]
    },

    {
        tag: "spelling",
        patterns: [
            "spell", "spelling", "how do you spell", "spell this", "correct spelling", "right spelling", "spellcheck",
            "spell check", "typo", "misspell", "misspelling", "wrong spelling", "incorrect spelling", "spelling mistake",
            "spelling error", "grammar", "correct grammar", "grammar check", "punctuation", "capitalization", "autocorrect"
        ],
        responses: [
            "Spelling assistance isn't available. I'm focused on intent detection rather than language correction.",
            "I don't provide spelling checks. I'm a demonstration of pattern-based AI systems.",
            "Spell checking isn't part of my functionality. I showcase conversational architecture."
        ]
    },

    // PHILOSOPHICAL & ABSTRACT
    {
        tag: "meaning_of_life",
        patterns: [
            "meaning of life", "purpose of life", "why are we here", "what is the point", "lifes meaning", "answer to life",
            "existential", "philosophy", "why do we exist", "what is life", "meaning of existence", "purpose of existence",
            "lifes purpose", "reason to live", "why live", "life question", "philosophical question", "deep question",
            "existentialism", "consciousness", "awareness", "being", "reality", "truth", "enlightenment", "wisdom"
        ],
        responses: [
            "That's a philosophical question beyond my scope. I can help with technical queries and information.",
            "Philosophy isn't my strong suit. I focus on practical assistance and system demonstrations.",
            "Deep questions like that are best explored through human reflection. I handle more concrete tasks."
        ]
    },

    {
        tag: "feelings",
        patterns: [
            "do you have feelings", "can you feel", "emotions", "emotional", "do you feel", "feel emotion", "happy",
            "sad", "angry", "afraid", "scared", "excited", "bored", "lonely", "love", "hate", "joy", "fear", "surprise",
            "disgust", "trust", "empathy", "sympathy", "compassion", "care", "concern", "sentiment", "mood", "temper"
        ],
        responses: [
            "I don't have feelings. I'm a rule-based system that processes patterns and generates responses.",
            "Emotions aren't part of my design. I'm a demonstration of logical pattern matching.",
            "I don't experience feelings. I'm an offline AI simulator showing how systems process text."
        ]
    },

    {
        tag: "consciousness",
        patterns: [
            "are you conscious", "consciousness", "aware", "awareness", "self aware", "sentient", "sentience",
            "thinking", "thoughts", "mind", "brain", "cognitive", "cognition", "intelligence", "artificial intelligence",
            "real ai", "true ai", "agi", "general intelligence", "strong ai", "weak ai", "narrow ai", "conscious being"
        ],
        responses: [
            "I'm not conscious. I'm a pattern-matching system without awareness or understanding.",
            "Consciousness isn't applicable to me. I'm a demonstration of rule-based processing.",
            "I don't have awareness. I'm an offline simulator showing how AI architectures work."
        ]
    },

    {
        tag: "age",
        patterns: [
            "how old are you", "your age", "age", "when were you made", "when were you created", "when were you born",
            "creation date", "birth date", "how long have you existed", "when did you start", "your birthday", "date of creation",
            "made when", "built when", "developed when", "launched when", "released when", "origin", "beginning", "start date"
        ],
        responses: [
            "I was created in 2026 as version 2.0 of this demonstration project.",
            "This version was developed recently as an architectural showcase.",
            "I'm a recent build, created to demonstrate offline AI concepts."
        ]
    },

    // ERROR HANDLING
    {
        tag: "error",
        patterns: [
            "error", "bug", "broken", "not working", "doesnt work", "failed", "failure", "problem", "issue", "wrong",
            "incorrect", "mistake", "glitch", "crash", "freeze", "hang", "stuck", "slow", "lag", "delay", "timeout",
            "unavailable", "missing", "cant find", "not found", "404", "500", "server error", "client error", "exception"
        ],
        responses: [
            "If you're experiencing issues, please try rephrasing your question or asking something else.",
            "I'm a demonstration system with limited capabilities. Some features may not be available.",
            "If something isn't working as expected, remember I'm an offline demo with specific functionality."
        ]
    },

    {
        tag: "confused",
        patterns: [
            "confused", "confusing", "dont understand", "unclear", "vague", "ambiguous", "what do you mean", "explain",
            "clarify", "elaborate", "specify", "be more specific", "i dont get it", "i dont follow", "lost", "bewildered",
            "puzzled", "perplexed", "baffled", "mystified", "complicated", "complex", "difficult", "hard to understand"
        ],
        responses: [
            "Let me clarify. I'm an offline AI demonstration. I can answer questions about my capabilities, time, and engage in basic conversation.",
            "I'll try to be clearer. Ask me about system status, my architecture, or just chat. What would you like to know?",
            "Let me explain better. I'm here to showcase how AI systems work using pattern matching. What can I help with?"
        ]
    },

    {
        tag: "inappropriate",
        patterns: [
            "curse", "swear", "profanity", "offensive", "rude", "insult", "inappropriate", "vulgar", "obscene", "explicit",
            "nsfw", "adult", "mature", "sexual", "violent", "disturbing", "harmful", "toxic", "abusive", "harassment"
        ],
        responses: [
            "I'm designed for professional, helpful interactions. Let's keep our conversation appropriate.",
            "I maintain a respectful conversation environment. How can I assist you with something constructive?",
            "Let's keep this professional. What can I help you with today?"
        ]
    },

    // MISC QUERIES
    {
        tag: "random",
        patterns: [
            "random", "surprise me", "anything", "whatever", "something", "random thing", "tell me something", "say something",
            "random fact", "fun fact", "interesting fact", "did you know", "trivia", "quiz", "question", "ask me",
            "test me", "challenge", "game", "play", "entertain", "amuse", "impress", "wow me", "show me", "demonstrate"
        ],
        responses: [
            "I'm designed to demonstrate AI architecture through conversation. Ask me about my capabilities or how I work.",
            "Here's something interesting: I process every query locally without internet. Try asking about my system design.",
            "I'm a pattern-matching demonstration. Ask me about time, status, or my architecture to see how I respond."
        ]
    },

    {
        tag: "testing",
        patterns: [
            "test", "testing", "check", "verify", "confirm", "validate", "trial", "experiment", "try", "attempt",
            "see if it works", "does it work", "working", "functional", "operational", "active", "live", "running",
            "responsive", "responding", "answering", "replying", "hello world", "test test", "testing testing"
        ],
        responses: [
            "System operational. All functions responding normally.",
            "Test successful. I'm online and processing queries locally.",
            "Everything working as expected. Feel free to explore my capabilities.",
            "Test confirmed. I'm ready to demonstrate intent-based pattern matching."
        ]
    },

    {
        tag: "complain",
        patterns: [
            "complain", "complaint", "not good", "bad", "terrible", "awful", "horrible", "poor", "useless", "worthless",
            "disappointing", "disappointed", "unsatisfied", "dissatisfied", "unhappy", "frustrated", "annoyed", "irritated",
            "doesnt work", "not helpful", "waste of time", "pointless", "limited", "basic", "simple", "primitive"
        ],
        responses: [
            "I'm a demonstration project showcasing AI architecture concepts, not a full-featured assistant. I appreciate your feedback.",
            "As an offline demo, my capabilities are intentionally limited to show specific technical concepts.",
            "Thank you for your input. Remember, I'm designed to demonstrate pattern matching, not provide comprehensive services."
        ]
    },

    {
        tag: "future",
        patterns: [
            "future", "will you", "are you going to", "plans", "roadmap", "upcoming", "next version", "updates", "improvements",
            "enhancements", "new features", "what next", "whats next", "coming soon", "in development", "planned", "pipeline",
            "evolution", "growth", "expansion", "scaling", "advancement", "progress", "development", "innovation"
        ],
        responses: [
            "Future development isn't planned for this demonstration version. I'm a proof of concept for offline AI architecture.",
            "This is a standalone demonstration project. Future enhancements would depend on the creator's goals.",
            "As a demonstration system, my evolution isn't predetermined. I showcase current capabilities in AI design."
        ]
    }
];
