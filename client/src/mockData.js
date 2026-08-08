// mockData.js

export const initialMockData = {
  theme: {
    name: "Tokyo Night",
    colors: {
      bg: "#1a1b26",
      bg_dark: "#16161e",
      surface: "#24283b",
      surface_glass: "rgba(36, 40, 59, 0.55)",
      elevated: "#414868",
      fg: "#c0caf5",
      fg_muted: "#a9b1d6",
      fg_dark: "#565f89",
      blue: "#7aa2f7",
      purple: "#bb9af7",
      cyan: "#7dcfff",
      green: "#9ece6a",
      orange: "#ff9e64",
      yellow: "#e0af68",
      red: "#f7768e",
      magenta: "#ff007c"
    },
    font: "JetBrains Mono"
  },
  user: {
    id: "user_123",
    name: "Rahul Kumar",
    initials: "RK",
    college: "NIT Trichy",
    track: "web-dev",
    trackName: "Web Development",
    trackIcon: "globe",
    currentStreak: 11,
    bestStreak: 23,
    totalDaysCompleted: 10,
    totalDays: 60,
    missedDays: [11],
    recoveryAvailable: true,
    joinDate: "2026-07-01",
    cohort: 7
  },
  peerPod: [
    {
      id: "user_456",
      name: "Ananya Sharma",
      initials: "AS",
      college: "IIT Bombay",
      streak: 14,
      currentDay: 12,
      status: "completed",
      lastActive: "2m ago",
      avatarGradient: ["#f7768e", "#ff9e64"]
    },
    {
      id: "user_789",
      name: "Vikram Patel",
      initials: "VP",
      college: "BITS Pilani",
      streak: 11,
      currentDay: 12,
      status: "building",
      lastActive: "15m ago",
      avatarGradient: ["#9ece6a", "#7dcfff"]
    },
    {
      id: "user_321",
      name: "Sneha Kumar",
      initials: "SK",
      college: "NIT Trichy",
      streak: 9,
      currentDay: 11,
      status: "completed",
      lastActive: "1h ago",
      avatarGradient: ["#bb9af7", "#ff007c"]
    }
  ],
  achievements: [
    {
      id: "streak_7",
      name: "7-Day Streak",
      icon: "flame",
      unlocked: true,
      unlockedAt: "2026-07-07"
    },
    {
      id: "first_deploy",
      name: "First Deploy",
      icon: "rocket",
      unlocked: true,
      unlockedAt: "2026-07-05"
    },
    {
      id: "streak_30",
      name: "30-Day Streak",
      icon: "diamond",
      unlocked: false
    },
    {
      id: "top_10",
      name: "Top 10%",
      icon: "crown",
      unlocked: false
    },
    {
      id: "night_owl",
      name: "Night Owl",
      icon: "moon",
      unlocked: true,
      unlockedAt: "2026-07-03",
      description: "Submitted after 11 PM"
    },
    {
      id: "early_bird",
      name: "Early Bird",
      icon: "sun",
      unlocked: false,
      description: "Submit before 8 AM"
    },
    {
      id: "recovery",
      name: "Comeback Kid",
      icon: "zap",
      unlocked: false,
      description: "Recover from a missed day"
    },
    {
      id: "perfect_week",
      name: "Perfect Week",
      icon: "star",
      unlocked: true,
      unlockedAt: "2026-07-07"
    }
  ],
  stats: {
    totalStudents: 12450,
    totalHired: 423,
    activeCohort: 7,
    averageCompletionRate: 34
  }
};

// Auto generate 60 days of web-dev tasks
export const generateDays = (completedDays, missedDays, currentDay, day12Completed) => {
  const days = [];
  const webTasks = [
    { title: "Setup Your Dev Environment", duration: "1 hour", difficulty: "Easy" },
    { title: "HTML Basics & Semantic Markup", duration: "1.5 hours", difficulty: "Easy" },
    { title: "CSS Fundamentals & Flexbox", duration: "2 hours", difficulty: "Easy" },
    { title: "CSS Grid Layout", duration: "2 hours", difficulty: "Medium" },
    { title: "JavaScript Basics", duration: "2 hours", difficulty: "Easy" },
    { title: "DOM Manipulation", duration: "2 hours", difficulty: "Medium" },
    { title: "Build a To-Do App (Vanilla JS)", duration: "3 hours", difficulty: "Medium" },
    { title: "Git & GitHub Basics", duration: "1.5 hours", difficulty: "Easy" },
    { title: "React Setup & JSX", duration: "2 hours", difficulty: "Medium" },
    { title: "React Components & Props", duration: "2.5 hours", difficulty: "Medium" },
    { title: "React State & Hooks", duration: "3 hours", difficulty: "Hard" },
    {
      title: "Build a Responsive Portfolio with React",
      duration: "2 hours",
      difficulty: "Medium",
      description: "Today you'll build a personal portfolio website that showcases your skills, projects, and journey. This is your digital resume — make it count.",
      requirements: [
        "Create at least 3 sections: Hero, Projects, Contact",
        "Must be fully responsive (mobile, tablet, desktop)",
        "Use React components for reusability",
        "Include smooth animations or transitions",
        "Deploy to Vercel, Netlify, or GitHub Pages"
      ],
      acceptanceCriteria: [
        "Live deployed URL accessible publicly",
        "GitHub repo with clean commit history",
        "LinkedIn post with screenshot + learnings",
        "Works perfectly on 390px width (mobile)"
      ],
      resources: [
        { title: "React Portfolio Guide", type: "article", duration: "10 min read", url: "#" },
        { title: "Figma Template", type: "design", duration: "Free to use", url: "#" },
        { title: "Video Walkthrough", type: "video", duration: "25 min", url: "#" }
      ],
      proTip: "Don't overthink the design. A clean, minimal portfolio beats a cluttered one. Focus on making it mobile-first — recruiters will likely view it on their phones."
    }
  ];

  for (let i = 1; i <= 60; i++) {
    const isCompleted = i === 12 ? day12Completed : (i < currentDay && !missedDays.includes(i));
    const isMissed = missedDays.includes(i);
    const isCurrent = i === currentDay;
    const isUpcoming = i > currentDay;

    let taskData = webTasks[i - 1] || {
      title: `Web Project Day ${i}: Advanced Topic`,
      duration: "2 hours",
      difficulty: i % 3 === 0 ? "Hard" : (i % 2 === 0 ? "Medium" : "Easy"),
      description: `Deepen your knowledge of web technologies on Day ${i}. Plan, structure, build, and deploy.`,
      requirements: ["Write modular code", "Handle edge cases", "Integrate with local storage", "Style beautifully"],
      acceptanceCriteria: ["Hosted link", "GitHub repository url"],
      resources: [{ title: "Documentation Guide", type: "article", duration: "5 min read", url: "#" }]
    };

    days.push({
      day: i,
      title: taskData.title,
      difficulty: taskData.difficulty,
      duration: taskData.duration,
      completed: isCompleted,
      missed: isMissed,
      current: isCurrent,
      upcoming: isUpcoming,
      description: taskData.description,
      requirements: taskData.requirements,
      acceptanceCriteria: taskData.acceptanceCriteria,
      resources: taskData.resources,
      proTip: taskData.proTip
    });
  }
  return days;
};
