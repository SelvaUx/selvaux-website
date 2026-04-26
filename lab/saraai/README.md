# SaraAI - Offline AI Behavior Simulator

![Status](https://img.shields.io/badge/status-online-success)
![Type](https://img.shields.io/badge/type-local%20simulation-blue)
![Architecture](https://img.shields.io/badge/architecture-intent--based-orange)

## 🎯 Purpose

**This is NOT a cloud-based chatbot or API wrapper.**

SaraAI is an **offline AI behavior engine** that demonstrates how intelligent systems work using **intent-based architecture**. This project showcases system design thinking, not just API integration.

### What This Shows

✅ **Intent Detection** - Pattern matching algorithms  
✅ **Response Mapping** - Context-aware reply selection  
✅ **Text Normalization** - Input preprocessing  
✅ **Confidence Scoring** - Match quality assessment  
✅ **Local Processing** - No external APIs required  

## 🏗️ Architecture

```
User Input → Normalize → Detect Intent → Match Pattern → Select Response → Display
```

### Flow Breakdown

1. **Input Normalization** (`utils.js`)
   - Convert to lowercase
   - Remove punctuation
   - Trim whitespace

2. **Intent Detection** (`engine.js`)
   - Loop through intent groups
   - Match patterns (exact, partial, reverse)
   - Calculate confidence scores

3. **Response Selection**
   - Pick random response from matched intent
   - Fallback for unknown inputs

4. **UI Update** (`ui.js`)
   - Render message in chat
   - Update debug panel
   - Display confidence level

## 📁 Project Structure

```
/lab/saraai/
├── index.html          # AI Dashboard UI
├── data/
│   ├── intents.js      # Intent groups with patterns & responses
│   └── metadata.js     # System configuration
├── js/
│   ├── engine.js       # Core intent matching logic
│   ├── ui.js           # Chat interface controller
│   └── utils.js        # Text processing utilities
├── css/
│   └── style.css       # Dashboard styling
└── README.md           # This file
```

## 🧠 How It Works

### Intent-Based Data Structure

Instead of hardcoding responses, we use **intent groups**:

```javascript
{
  tag: "greeting",
  patterns: ["hi", "hello", "hey", "hi sara"],
  responses: [
    "Hello! I'm SaraAI.",
    "Hi 👋 System online.",
    "Hey! Ready when you are."
  ]
}
```

This allows **scalability** - add thousands of patterns without changing the code.

### Pattern Matching

The engine checks:
- **Exact match** → 100% confidence
- **Contains pattern** → 80% confidence  
- **Reverse contains** → 60% confidence

Matches above 50% confidence are accepted.

## 🚀 Usage

1. Open `index.html` in a browser
2. Type messages in the input box
3. Watch the debug panel show detected intents
4. See confidence scores in real-time

### Try These:

- "Hi Sara"
- "What can you do?"
- "Tell me a joke"
- "What's the time?"
- "Who made you?"

## 💡 Key Takeaways

This project demonstrates:

1. **Rule-based AI** - How many real systems start
2. **System architecture** - Not just API calls
3. **Scalable design** - Intent groups handle massive data
4. **Local processing** - Privacy-first approach

## 🔧 Future Enhancements

- Fuzzy matching for typos
- Context awareness (conversation history)
- Entity extraction (dates, names, etc.)
- Multi-language support

## 👨‍💻 Developer

Built by **Selva Pandi Francis** (SelvaUx)  
Portfolio: [selvaux.in](https://selvaux.in)

---

**This is architecture-focused engineering, not hype.**
