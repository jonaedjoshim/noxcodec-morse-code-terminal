<div align="center">

# 📡 NOXCODEC

### Morse Code Intelligence Terminal

**Encode. Decode. Transmit.**

A modern, hacker terminal-inspired Morse code translator built with React, Vite, and Tailwind CSS.

Convert text into Morse code, decode incoming signals, generate Morse audio, visualize transmissions, and explore an interactive Morse reference—all directly in your browser.

<br />

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_NoxCodec-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://noxcodec-morse-code-terminal.vercel.app/)
[![React](https://img.shields.io/badge/React-18-149eca?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br />

**[🚀 Launch Terminal](https://noxcodec-morse-code-terminal.vercel.app/)** · **[📖 Explore Features](#-features)** · **[⚙️ Installation](#️-getting-started)**

</div>

---

## 📖 Overview

**NOXCODEC** is a responsive, browser-based Morse code translator designed with a futuristic hacker terminal aesthetic.

Inspired by classic command-line interfaces and radio communication systems, NOXCODEC combines the simplicity of Morse code with modern frontend technologies.

The application allows users to translate text and Morse code in real time, listen to generated Morse signals, visualize dots and dashes, and interact with a complete Morse alphabet reference.

NOXCODEC is a frontend-focused project. Its translation and audio generation features operate directly in the browser without requiring a backend server or user account.

### 🎯 Project Goals

- Build an intuitive, real-time Morse code translator.
- Create a distinctive hacker terminal-inspired interface.
- Implement accurate Morse audio playback.
- Provide an interactive Morse code reference.
- Keep the application responsive across devices.
- Organize the React codebase using reusable components and custom hooks.
- Improve accessibility and maintainability.
- Deliver a lightweight, browser-based experience.

---

## ✨ Features

### 🔄 1. Real-Time Morse Code Translation

Translate messages instantly in both directions.

**Text → Morse**

```text
Input:
HELLO WORLD

Output:
.... . .-.. .-.. --- / .-- --- .-. .-.. -..
```

**Morse → Text**

```text
Input:
... --- ...

Output:
SOS
```

**Capabilities:**

- Instant bidirectional translation
- English alphabet (A–Z)
- Numbers (0–9)
- Common punctuation
- Automatic character normalization
- Word separation using `/`
- Support for Unicode dot and dash variations
- Invalid Morse sequence handling
- Character and Morse token counters

Translation happens as the user types, without requiring a submit button.

---

### 📚 2. Interactive Morse Reference

NOXCODEC includes an interactive Morse code reference chart.

Users can explore Morse representations of:

- Letters A–Z
- Numbers 0–9
- Word separators

Each character is displayed alongside its Morse representation.

**Interactive functionality:**

- Click a character to insert it into the translator.
- Automatically generate the corresponding Morse code.
- Insert Morse signals directly when using Morse-to-text mode.
- Add word separators using the SPACE button.
- Prevent duplicate word separators.

**Example:**

Click:

```text
S → O → S
```

Generated Morse:

```text
... --- ...
```

Decoded message:

```text
SOS
```

This feature makes NOXCODEC useful for learning and practicing Morse code.

---

### 🔊 3. Morse Audio Player

NOXCODEC can generate audible Morse code transmissions using the browser's Web Audio API.

The audio engine converts Morse symbols into timed sound signals.

**Features:**

- Play Morse code as audio
- Stop playback at any time
- Adjustable transmission speed
- Automatic playback cleanup
- Browser-generated audio
- No external audio files required

#### Morse Timing

The audio engine follows standard Morse timing principles.

| Element | Duration |
|---|---|
| Dot (`.`) | 1 unit |
| Dash (`-`) | 3 units |
| Gap between symbols | 1 unit |
| Gap between letters | 3 units |
| Gap between words | 7 units |

The duration of one unit depends on the selected transmission speed.

#### Adjustable Speed

Transmission speed can be adjusted between:

**5–30 WPM (Words Per Minute)**

Lower WPM values produce slower signals, making Morse code easier to practice.

Higher WPM values produce faster transmissions.

The audio engine uses a 600 Hz tone.

---

### 💡 4. Morse Signal Visualizer

The Morse Audio Player includes a visual signal indicator.

During playback, a circular green indicator illuminates according to the transmitted Morse symbols.

**Visualization behavior:**

- Short illumination for dots
- Longer illumination for dashes
- No illumination during signal gaps
- Live transmission status
- Automatic reset when playback stops

The visualizer complements the audio player and helps users understand Morse signal timing.

---

### 📋 5. Clipboard Integration

Quickly copy translated messages using the built-in clipboard controls.

Available actions:

- Copy plaintext
- Copy Morse code
- Copy the complete transmission

**Full transmission example:**

```text
HELLO WORLD

.... . .-.. .-.. --- / .-- --- .-. .-.. -..
```

Clipboard operations display toast notifications indicating success or failure.

The application uses the browser Clipboard API.

Clipboard access may require HTTPS or a secure browser context.

---

### 🔗 6. Shareable Translation Links

Generate shareable URLs containing encoded messages.

**Example URL:**

```text
https://noxcodec-morse-code-terminal.vercel.app/translator?msg=U09T
```

Opening the link loads the encoded message directly into the translator.

**Features:**

- Generate shareable message links
- Automatically copy generated URLs
- Restore messages from shared links
- Unicode-safe URL encoding
- No account required

> [!IMPORTANT]
> Shared messages are Base64-encoded, not encrypted.
>
> Base64 encoding does not provide confidentiality. Anyone with access to the link can decode its contents.
>
> Avoid using this feature to share passwords, credentials, or other sensitive information.

---

### 🗂️ 7. Transmission History

NOXCODEC automatically maintains a small history of recent translations.

History is stored locally using the browser's `localStorage` API.

**Features:**

- Automatically save recent transmissions
- Store up to five entries
- Search previous transmissions
- Restore saved messages
- View approximate timestamps
- Clear saved history
- Confirmation before deleting history

History entries are saved after a short typing delay to avoid unnecessary updates.

**Privacy:**

Transmission history is stored in the user's browser.

It is not automatically uploaded to a NOXCODEC backend.

Users can remove saved entries using the **WIPE LOGS** action.

---

### 🎨 8. Hacker Terminal Interface

NOXCODEC features a custom dark interface inspired by terminal environments and radio communication systems.

**Design elements:**

- Dark background
- Neon-green accents
- Monospace typography
- Glowing signal indicators
- Radar animation
- Terminal-inspired labels
- Subtle borders and hover effects
- Scroll-triggered animations
- Responsive layouts

The interface is built primarily with Tailwind CSS.

---

### 📱 9. Responsive Design

NOXCODEC is designed for multiple screen sizes.

Supported layouts include:

- Mobile devices
- Tablets
- Laptops
- Desktop monitors

The interface adapts its layout based on available screen space.

On smaller screens, translator panels appear vertically.

On larger screens, they appear side by side.

---

### ♿ 10. Accessibility Features

The application includes accessibility improvements such as:

- Semantic HTML elements
- Accessible button labels
- Keyboard navigation
- Visible focus indicators
- Screen-reader-friendly notifications
- Reduced-motion preferences
- Accessible form labels
- Keyboard-accessible confirmation dialogs
- Skip-to-content navigation

These features improve usability for keyboard and assistive technology users.

---

### 📜 11. Morse Code History

The homepage includes a timeline covering major milestones in Morse code and telegraph communication.

Topics include:

- Early electromagnetic telegraph development
- Samuel Morse's telegraph patent
- The historic 1844 transmission
- Titanic distress communications
- Morse code during World War II
- The maritime transition to digital distress systems
- Modern amateur radio communication

This section provides historical context alongside the translator.

---

## 🛠️ Tech Stack

NOXCODEC is built using modern frontend technologies.

| Technology | Purpose |
|---|---|
| React 18 | UI development |
| Vite 7 | Development server and production builds |
| JavaScript (ES6+) | Application logic |
| Tailwind CSS 3 | Styling and responsive design |
| React Router DOM 6 | Client-side routing |
| Lucide React | Icons |
| AOS | Scroll-triggered animations |
| Web Audio API | Morse audio generation |
| LocalStorage API | Transmission history |
| Clipboard API | Copy functionality |
| Node.js Test Runner | Automated utility testing |
| Vercel | Hosting and deployment |

### Why React?

React provides a component-based architecture that makes NOXCODEC easier to maintain and extend.

Reusable components allow the translator, audio player, reference chart, and history interface to remain independently organized.

### Why Vite?

Vite provides a fast development environment, Hot Module Replacement, and optimized production builds.

### Why Tailwind CSS?

Tailwind CSS enables consistent styling while keeping the hacker terminal theme customizable and responsive.

### Why Web Audio API?

The Web Audio API allows NOXCODEC to generate Morse signals directly in the browser without downloading audio assets or depending on third-party audio libraries.

---

## 📁 Project Structure

```text
noxcodec-morse-code-terminal/
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── home/
│   │   │   └── RadarAnimation.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── translator/
│   │   │   ├── Converter.jsx
│   │   │   ├── TranslatorPanel.jsx
│   │   │   ├── MorseReference.jsx
│   │   │   ├── MorseAudioPlayer.jsx
│   │   │   └── History.jsx
│   │   │
│   │   ├── ui/
│   │   │   └── Toast.jsx
│   │   │
│   │   └── SEO.jsx
│   │
│   ├── data/
│   │   └── morseData.json
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useMorse.js
│   │   ├── useMorseAudio.js
│   │   └── useDialogFocus.js
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── TranslatorPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── utils/
│   │   ├── morseUtils.js
│   │   └── clipboard.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── tests/
│   └── morseUtils.test.js
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── .gitignore
└── README.md
```

### Architecture Overview

The project follows a feature-oriented component structure.

**Components**

Contain reusable UI elements such as the translator panels, Morse reference chart, audio player, and navigation.

**Pages**

Represent the application's main routes.

**Hooks**

Manage reusable state and browser interactions, including translation state, local storage, audio playback, and dialog focus.

**Utilities**

Contain independent helper functions for Morse conversion, URL encoding, and clipboard operations.

**Data**

Stores the Morse alphabet mapping used throughout the application.

---

## ⚙️ Getting Started

Follow these steps to run NOXCODEC locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

The project has been developed using Node.js 22.

You can verify your installation:

```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/noxcodec-morse-code-terminal.git
```

### 2. Navigate to the Project

```bash
cd noxcodec-morse-code-terminal
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

The application should now be running locally.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Generate a production build |
| `npm run preview` | Preview the production build |
| `npm test` | Run automated tests |

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The production files will be generated inside the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test
```

---

## 🧪 Testing

NOXCODEC includes automated tests for its Morse translation utilities.

The test suite uses Node.js's built-in test runner.

### Covered Functionality

- Text-to-Morse conversion
- Morse-to-text conversion
- Lowercase text handling
- Word separators
- Multiple spaces
- Unsupported characters
- Unicode Morse symbols
- Invalid Morse sequences
- Empty input
- URL encoding and decoding
- Unicode-safe message sharing
- Round-trip translation

### Run Automated Tests

```bash
npm test
```

The current utility test suite contains 16 test cases.

> [!NOTE]
> Automated coverage currently focuses on translation utilities.
>
> Audio playback, accessibility interactions, and some browser-dependent features require additional browser testing.

---

## 📡 How to Use

### Translate Text to Morse

1. Open the Translator page.
2. Select Text-to-Morse mode.
3. Enter your message in the Plain Text panel.
4. View the generated Morse code.
5. Copy, share, or play the translated signal.

### Decode Morse to Text

1. Open the Translator page.
2. Switch to Morse-to-Text mode.
3. Enter Morse symbols.
4. Separate letters using spaces.
5. Separate words using `/`.
6. View the decoded message.

### Use the Interactive Reference

1. Scroll to the Interactive Morse Reference section.
2. Select a letter or number.
3. The character or Morse sequence will be inserted automatically.
4. Use SPACE to create word boundaries.

### Play Morse Audio

1. Enter a message.
2. Scroll to Signal Transmission.
3. Choose a transmission speed.
4. Click PLAY MORSE.
5. Listen to the audio and observe the visual signal.
6. Click STOP to cancel playback.

### Restore a Previous Transmission

1. Scroll to Transmission Logs.
2. Locate a saved message.
3. Click the history entry.
4. The message will be restored in the translator.

---

## 🔐 Privacy & Security

NOXCODEC is a client-side Morse code application.

The following operations are performed in the browser:

- Morse encoding
- Morse decoding
- Audio generation
- Signal visualization
- Transmission history management

NOXCODEC does not require a user account or backend translation service.

### Local Storage

Recent transmissions are stored in browser localStorage.

This data remains available in the browser until removed by the user or cleared by the browser.

### Shareable Links

Shared messages are encoded using Base64.

**Base64 is not encryption.**

Messages included in URLs may be visible in browser history, shared links, and infrastructure logs.

Do not use shareable links for confidential information.

### External Resources

The application loads its JetBrains Mono font from Google Fonts.

The website is hosted on Vercel.

As with most hosted web applications, requests for website resources may be processed by hosting or third-party infrastructure.

---

## 🚀 Deployment

NOXCODEC is deployed on Vercel.

**Live Application:**

https://noxcodec-morse-code-terminal.vercel.app/

### Deploy to Vercel

1. Push the project to GitHub.
2. Sign in to Vercel.
3. Import the GitHub repository.
4. Select Vite as the framework preset.
5. Configure the build settings.
6. Deploy.

### Build Configuration

```text
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

### React Router Support

The project includes a `vercel.json` configuration for client-side routing.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This allows routes such as `/translator` to load when accessed directly.

---

## 🌐 Application Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/translator` | Morse translator |
| `*` | Custom 404 page |

The application uses React Router for navigation.

---

## 🧠 Technical Highlights

### Custom React Hooks

NOXCODEC uses custom hooks to separate application logic from presentation components.

**`useMorse`**

Manages translation state, history, clipboard interactions, and share links.

**`useMorseAudio`**

Handles Web Audio playback, timing, transmission speed, and cleanup.

**`useLocalStorage`**

Synchronizes React state with browser localStorage.

**`useDialogFocus`**

Manages keyboard focus within confirmation dialogs.

### Reusable Components

The translation interface uses a reusable `TranslatorPanel` component for both plaintext and Morse input/output.

This reduces duplicated JSX and keeps styling consistent.

### Data-Driven Morse Mapping

Morse code mappings are stored in `morseData.json`.

The translation engine and interactive reference use the same data source.

This helps avoid duplicated mapping definitions.

---

## 🔮 Future Improvements

Potential future enhancements include:

- Download translations as text files
- Additional Morse practice exercises
- Keyboard-based Morse tapping
- More advanced audio controls
- Expanded automated test coverage
- Improved offline support through a Progressive Web App
- Additional accessibility testing

These features are not part of the current implementation.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your implementation.
5. Open a pull request.

Please keep changes focused and consistent with the existing project architecture.

---

## 📄 License

No open-source license has been specified yet.

Until a license is added, standard copyright restrictions apply.

If you want others to freely use, modify, and distribute the project, consider adding an appropriate open-source license.

---

## 👨‍💻 Author

Developed as a frontend project focused on modern React development, interactive browser APIs, and creative UI design.

**Project:** NOXCODEC — Morse Code Intelligence Terminal

**Live Website:** [NoxCodec](https://noxcodec-morse-code-terminal.vercel.app/)

**GitHub:** [Project Repository](https://github.com/jonaedjoshim/noxcodec-morse-code-terminal.git)

---

<div align="center">

### 📡 NOXCODEC

**FROM TEXT TO SIGNAL. FROM SIGNAL TO MEANING.**

`-. --- -..- -.-. --- -.. . -.-.`

<br />

Built with React, Vite, and Tailwind CSS.

[⬆ Back to Top](#-noxcodec)

</div>
