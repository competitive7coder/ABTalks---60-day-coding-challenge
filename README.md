# ⚡ ABTalks — 60-Day Cohort Coding Challenge

> A premium, gamified developer accountability hub. Build consistency, unlock streaks, and climb the leaderboard alongside your cohort.

---

## ## 🔑 Demo Credentials

The following credentials can be used to test the different user roles in ABTalks.

### 👨‍💼 Admin Account

- **Email:** rahul@gmail.com
- **Password:** 123
- **Role:** Admin

### 👨‍🎓 Normal User Account

- **Email:** pallab@gmail.com
- **Password:** 123
- **Role:** Normal User

> ⚠️ These are demo credentials intended for testing and demonstration purposes only.

## 🎨 Creative & Futuristic Design System

ABTalks is built with a hackathon-winning, developer-first aesthetic featuring:
* **🌌 Subtle Code Rain Canvas**: A high-performance HTML5 canvas particle rain background rendering falling binary/ASCII characters in glowing blue and purple tones.
* **🔥 Dynamic 20-Column Heatmap**: A custom-designed, Duolingo-style grid calendar replacing day numbers with glowing flame emojis (`🔥`) on completed days to showcase consistency.
* **🛡️ Futuristic Profile Dashboards**: Mac-style sub-panels displaying cohort details, social linkage statuses, and a secure crimson session disconnect controller.

---

## ⚙️ Core Technical Features

### 1. 🔐 Authentication & Role-Based Access

- **End-to-End Authentication**: Secure user authentication and protected routes for the platform.
- **Two User Roles**: Supports **Normal Users** and **Admins** with role-based access and permissions.
- **Admin Controls**: Admins can create, update, and manage coding tasks and challenge roadmaps.

### 2. 🗺️ 60-Day Challenge & Roadmaps

- **Pre-Built Roadmaps**: Users can choose from structured roadmaps such as **Frontend, Backend, and Full Stack**.
- **Day-by-Day Progress**: Users follow their selected roadmap and complete tasks sequentially throughout the 60-day challenge.
- **Task Submission**: Users can submit their daily task work and track their challenge progress.

### 3. 🏆 Ranking & Points System

- **Points-Based Ranking**: Users earn points by completing and submitting daily challenges.
- **Leaderboard**: Users are ranked based on their earned points, encouraging consistency and healthy competition.
- **Progress Tracking**: Tracks user activity and challenge completion throughout the 60-day journey.

### 4. 📱 Responsive User Experience

- **Responsive UI**: Designed to provide a consistent experience across desktop, tablet, and mobile devices.
- **User & Admin Dashboards**: Dedicated interfaces for managing challenges, roadmaps, tasks, submissions, and progress.

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
