# ⚡ ABTalks — 60-Day Cohort Coding Challenge

> A premium, gamified developer accountability hub. Build consistency, unlock streaks, and climb the leaderboard alongside your cohort.

---

## 🎨 Creative & Futuristic Design System

ABTalks is built with a hackathon-winning, developer-first aesthetic featuring:
* **🌌 Subtle Code Rain Canvas**: A high-performance HTML5 canvas particle rain background rendering falling binary/ASCII characters in glowing blue and purple tones.
* **🐚 Interactive Live Terminal Shell**: A simulated, fully functional terminal shell allowing visitors to query cohort tracks, check directories, and initialize challenges via raw shell commands (`help`, `tracks`, `about`, `start`, `clear`).
* **🔥 Dynamic 10-Column Heatmap**: A custom-designed, Duolingo-style grid calendar replacing day numbers with glowing flame emojis (`🔥`) on completed days to showcase consistency.
* **🛡️ Futuristic Profile Dashboards**: Mac-style sub-panels displaying cohort details, social linkage statuses, and a secure crimson session disconnect controller.

---

## ⚙️ Core Technical Features

### 1. Verification & Security Engine
* **Anti-Cheat Link Detector**: Automatically validates that submitted repository and post links belong to legitimate `github.com` and `linkedin.com` domains.
* **Duplicate Prevention**: Prevents cheating by ensuring no user can submit the same commit hash or social post URL across multiple days.

### 2. Live Cohort Sync
* **Dynamic Leaderboard**: Fetches and ranks cohort members based on active streaks in real-time.
* **Live Peer Pod**: Displays online cohort members and their latest activities to drive community accountability.

---

## 🚀 Tech Stack

* **Frontend**: React (v19), React Router DOM (v6), Vite
* **Styling**: Vanilla CSS, TailwindCSS (glassmorphic utility classes)
* **Icons**: Lucide React SVG assets
* **Backend**: Node.js, Express
* **Database**: MongoDB (Mongoose ODM)
* **Session Manager**: Cookie-based JWT tokens

---

## 🛠️ Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB local instance or MongoDB Atlas URI

### Installation & Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pallab-at-tech/ABTalks---60-day-coding-challenge.git
   cd ABTalks---60-day-coding-challenge
   ```

2. **Backend Server Setup**:
   ```bash
   cd server
   npm install
   # Create a .env file and specify MONGODB_URL, SECRET_KEY_ACCESS_TOKEN, etc.
   npm run dev
   ```

3. **Frontend Client Setup**:
   ```bash
   cd ../client
   npm install --legacy-peer-deps
   npm run dev
   ```

---

## 📁 Project Structure

```bash
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx       # Cyberpunk matrix landing page & CLI shell
│   │   │   ├── Dashboard.jsx     # Onboarding track selector, Heatmap & Leaderboard
│   │   │   └── ChallengeDay.jsx  # Daily submission panels and Lucide tabs
│   │   └── api.js                # API handler client wrappers
│   └── package.json
└── server/
    ├── controller/
    │   ├── challenge.controller.js  # Roadmap generator & fallback check queries
    │   └── submission.controller.js # Domain validation & duplicate validators
    ├── routes/
    │   └── submission.route.js      # Endpoint routes definitions
    └── package.json
```

---

## 📝 Commit Commands Guide

If you're working in a shared branch and need to push changes cleanly, follow these commands:

1. **Stage and commit changes**:
   ```powershell
   git add .
   git commit -m "feat: implement premium gamified UI and security validators"
   ```

2. **Integrate remote edits**:
   ```powershell
   git stash -u
   git pull origin main
   git stash pop
   ```

3. **Deploy to GitHub**:
   ```powershell
   git push origin main
   ```
