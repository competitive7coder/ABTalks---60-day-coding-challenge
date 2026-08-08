import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, getCurrentChallenge, getSubmissions, createChallenge, getLeaderboard, logOut } from '../api';
import { 
  Home, 
  Trophy, 
  User, 
  Flame, 
  ClipboardCheck, 
  Award, 
  Github, 
  Linkedin, 
  LogOut, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBuddyPopup, setShowBuddyPopup] = useState(true);
  const [user, setUser] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'home'); // 'home' | 'board' | 'profile'
  const [noChallenge, setNoChallenge] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('Full Stack');
  const [initializing, setInitializing] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to terminate session securely. Redirecting...');
      navigate('/');
    }
  };

  const handleInitChallenge = async () => {
    setInitializing(true);
    try {
      await createChallenge(selectedTrack);
      const challengeRes = await getCurrentChallenge();
      setChallenge(challengeRes.challenge);
      setNoChallenge(false);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to initialize track');
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    async function loadDashboard() {
      try {
        const userRes = await getCurrentUser();
        setUser(userRes.data);
        
        let challengeData;
        try {
          const challengeRes = await getCurrentChallenge();
          challengeData = challengeRes.challenge;
        } catch (challengeErr) {
          const storedTrack = localStorage.getItem('chosen_track');
          if (storedTrack) {
            await createChallenge(storedTrack);
            const secondAttempt = await getCurrentChallenge();
            challengeData = secondAttempt.challenge;
            localStorage.removeItem('chosen_track');
          } else {
            setNoChallenge(true);
          }
        }
        if (challengeData) {
          setChallenge(challengeData);
        }

        const subsRes = await getSubmissions();
        setSubmissions(subsRes.submissions || []);

        const leaderboardRes = await getLeaderboard();
        setLeaderboard(leaderboardRes.data || []);
      } catch (err) {
        console.error(err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-fg font-sans flex items-center justify-center">
        <div className="text-sm select-none animate-pulse">&gt;_ loading_dashboard_metrics...</div>
      </div>
    );
  }

  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'US';
  const displayStreak = user?.current_streak || 0;
  const displayDay = challenge?.current_day || 1;
  const currentTask = challenge?.task || {};
  const isCompleted = submissions.some(s => s.day === displayDay);

  // Calculate progress percent
  const progressPercent = Math.round(((displayDay - (isCompleted ? 0 : 1)) / (challenge?.total_day || 60)) * 100);

  // Get days list to render in calendar card
  const completedDaysSet = new Set(submissions.map(s => s.day));
  const renderedDays = Array.from({ length: 20 }, (_, i) => {
    const dayNum = i + 1;
    const completed = completedDaysSet.has(dayNum);
    const current = dayNum === displayDay && !completed;
    const missed = dayNum < displayDay && !completed;
    const upcoming = dayNum > displayDay;
    return {
      day: dayNum,
      completed,
      current,
      missed,
      upcoming
    };
  });

  // Calculate dynamic leaderboard merged with mock metrics for testing/hackathon view
  const combinedLeaderboard = [...leaderboard].map(u => ({
    name: u.name,
    streak: u.current_streak,
    completed: u.current_streak,
    track: "Full Stack",
    badge: u.current_streak >= 30 ? "💎 Veteran" : u.current_streak >= 10 ? "🔥 Streaker" : "🌱 Newbie",
    initials: u.name.slice(0, 2).toUpperCase(),
    color: u.current_streak >= 30 ? "from-yellow to-orange" : "from-blue to-purple"
  }));

  const mockFallbacks = [
    { name: "Priya Kumar", streak: 60, completed: 60, track: "Full Stack", badge: "🏆 Champ", initials: "PK", color: "from-yellow to-orange" },
    { name: "Rahul Sharma", streak: 34, completed: 34, track: "Backend", badge: "⚡ Speedrunner", initials: "RS", color: "from-blue to-purple" },
    { name: "Ananya Patel", streak: 28, completed: 30, track: "Frontend", badge: "🛡️ Consistent", initials: "AP", color: "from-cyan to-blue" },
    { name: "Sneha Reddy", streak: 21, completed: 21, track: "Full Stack", badge: "🔥 Streaker", initials: "SR", color: "from-purple to-magenta" },
    { name: "Vikram Malhotra", streak: 18, completed: 20, track: "Backend", badge: "⚙️ Builder", initials: "VM", color: "from-green to-cyan" },
    { name: "Arjun Das", streak: 12, completed: 12, track: "Frontend", badge: "🌱 Newbie", initials: "AD", color: "from-red to-orange" }
  ];

  mockFallbacks.forEach(mock => {
    if (combinedLeaderboard.length < 6 && !combinedLeaderboard.some(u => u.name === mock.name)) {
      combinedLeaderboard.push(mock);
    }
  });

  combinedLeaderboard.sort((a, b) => b.streak - a.streak);

  return (
    <div className="min-h-screen bg-bg text-fg font-sans relative overflow-x-hidden selection:bg-blue/30 selection:text-blue pb-22.5 md:pb-10">
      {/* Dynamic Ambient Background Glows */}
      <div className="ambient-glow glow-1 -right-15 top-20 bg-blue/20 anim-float"></div>
      <div className="ambient-glow glow-2 -left-20 top-100 bg-purple/15 anim-float" style={{ animationDelay: '2s' }}></div>
      <div className="ambient-glow glow-3 -right-10 bottom-10 bg-cyan/15 anim-float" style={{ animationDelay: '4s' }}></div>

      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-bg/75 backdrop-blur-2xl z-50 border-b border-border">
        <div className="flex items-center gap-2.5 font-extrabold text-base cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-7.5 h-7.5 bg-linear-to-br from-blue to-purple rounded-lg flex items-center justify-center relative overflow-hidden shadow-blue-glow">
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="tracking-wide text-transparent bg-clip-text bg-linear-to-r from-blue via-purple to-cyan">ABTalks</span>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className={`w-8.5 h-8.5 rounded-lg bg-linear-to-br from-blue to-purple flex items-center justify-center font-bold text-[11px] text-bg border-2 transition-all duration-300 cursor-pointer ${activeTab === 'profile' ? 'border-purple scale-110 shadow-purple-glow' : 'border-blue/45 hover:scale-105'}`} 
            onClick={() => setActiveTab('profile')}
          >
            {initials}
          </div>
        </div>
      </header>

      {/* 1. HOME TAB */}
      {activeTab === 'home' && (
        noChallenge ? (
          <div className="max-w-160 mx-auto px-5 py-8 text-center anim-scaleIn w-full">
            <div className="glass-panel rounded-2xl p-6 border border-border-light relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue/5 rounded-full blur-2xl"></div>
              <span className="inline-flex items-center gap-1.5 bg-blue/12 text-blue px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-3">
                🚀 Welcome to ABTalks
              </span>
              <h2 className="text-base font-extrabold text-fg mb-1">Select Your Cohort Track</h2>
              <p className="text-xs text-fg-dark mb-6">You do not have an active track yet. Choose one to initialize your 60-day roadmap.</p>
              
              <div className="flex flex-col gap-3.5 text-left mb-6">
                <div 
                  onClick={() => setSelectedTrack('Full Stack')} 
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedTrack === 'Full Stack' ? 'bg-blue/10 border-blue shadow-[0_0_15px_var(--blue-glow)]' : 'bg-surface/30 border-border hover:bg-surface/50'}`}
                >
                  <h4 className="text-xs font-black text-fg mb-0.5">Full Stack (Web Dev)</h4>
                  <p className="text-[10px] text-fg-dark">Curriculum covering React, Node.js, Express, and Database development.</p>
                </div>
                <div 
                  onClick={() => setSelectedTrack('Backend')} 
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedTrack === 'Backend' ? 'bg-purple/10 border-purple shadow-[0_0_15px_var(--purple-glow)]' : 'bg-surface/30 border-border hover:bg-surface/50'}`}
                >
                  <h4 className="text-xs font-black text-fg mb-0.5">Backend (AI/ML & DSA)</h4>
                  <p className="text-[10px] text-fg-dark">Core algorithms, systems architecture, and machine learning models.</p>
                </div>
                <div 
                  onClick={() => setSelectedTrack('Frontend')} 
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${selectedTrack === 'Frontend' ? 'bg-cyan/10 border-cyan shadow-[0_0_15px_var(--cyan-glow)]' : 'bg-surface/30 border-border hover:bg-surface/50'}`}
                >
                  <h4 className="text-xs font-black text-fg mb-0.5">Frontend (Mobile & UI)</h4>
                  <p className="text-[10px] text-fg-dark">Cross-platform app construction, responsive design and animations.</p>
                </div>
              </div>

              <button 
                onClick={handleInitChallenge}
                disabled={initializing}
                className="w-full py-3.5 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-xs hover:-translate-y-0.5 shadow-blue-glow transition-all duration-300 cursor-pointer uppercase tracking-wider"
              >
                {initializing ? 'Configuring system environment...' : 'Initialize 60-Day challenge'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 px-5 py-4 md:grid-cols-[2fr_1.2fr] md:gap-6 md:px-10 md:py-6 max-w-300 mx-auto anim-scaleIn">
            <div className="flex flex-col gap-4">
              <div className="py-2.5 flex items-center gap-2">
                <div>
                  <h1 className="text-xl font-extrabold mb-1 flex items-center gap-1.5">
                    Hey {user?.name}! 
                    <Flame className="w-5 h-5 text-orange fill-orange animate-pulse" />
                  </h1>
                  <p className="text-fg-dark text-xs">You're on fire — Day {displayDay} of 60</p>
                </div>
              </div>

            {/* Streak Card */}
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden border border-border-light hover:shadow-[0_8px_32px_rgba(122,162,247,0.15)] transition-all duration-300">
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div>
                  <h2 className="text-[10px] text-blue font-bold tracking-wider uppercase mb-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Current Streak
                  </h2>
                  <div className="text-5xl font-extrabold bg-linear-to-r from-blue to-cyan bg-clip-text text-transparent">{displayStreak}</div>
                  <div className="text-fg-dark text-[11px] mt-1.5">
                    days strong · Best: {user?.longest_streak || 0}
                  </div>
                </div>
                <div className="text-4xl filter drop-shadow-orange-glow anim-flame">
                  <Flame className="w-12 h-12 text-orange fill-orange" />
                </div>
              </div>
              <div className="calendar relative z-10">
                {renderedDays.map((day) => (
                  <div
                    key={day.day}
                    className={`calendar-day ${day.completed ? 'day-done' : ''} ${day.missed ? 'day-missed' : ''} ${day.current ? 'day-today' : ''} ${day.upcoming ? 'day-upcoming' : 'day-empty'}`}
                    onClick={() => navigate(`/day/${day.day}`)}
                    style={{ fontSize: day.completed ? '16px' : '10px' }}
                  >
                    {day.completed ? '🔥' : day.day}
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Task */}
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden border border-border-light hover:shadow-[0_8px_32px_rgba(122,162,247,0.15)] transition-all duration-300">
              <div className="flex justify-between items-center mb-3.5">
                <span className="inline-flex items-center gap-1.5 bg-blue/12 text-blue px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> {challenge?.challenge_name} Track
                </span>
                <span className="text-fg-dark text-[10px] flex items-center gap-1">
                  ~2 hrs
                </span>
              </div>
              <h3 className="text-base font-bold mb-2 leading-snug">{currentTask.task || "Start Coding..."}</h3>
              <p className="text-fg-dark text-xs leading-relaxed mb-3.5">{currentTask.description || "Deploy daily commits to secure your coding streaks."}</p>
              <div className="flex gap-3 mb-4 flex-wrap">
                <span className="text-[10px] text-fg-dark flex items-center gap-1 font-medium">
                  <Zap className="w-3.5 h-3.5 text-yellow" /> {currentTask.difficulty_level || "Medium"}
                </span>
                <span className="text-[10px] text-fg-dark flex items-center gap-1 font-medium">
                  💻 React, CSS
                </span>
                <span className="text-[10px] text-fg-dark flex items-center gap-1 font-medium">
                  🎯 Deploy
                </span>
              </div>
              {isCompleted ? (
                <button className="w-full py-3.5 bg-linear-to-r from-green to-[#9ece6acc] text-bg font-bold rounded-xl text-xs hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-1" onClick={() => navigate(`/day/${displayDay}`)}>
                  <CheckCircle2 className="w-4 h-4" /> challenge_completed
                </button>
              ) : (
                <button className="w-full py-3.5 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-xs shadow-blue-glow hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--blue-glow)] transition-all duration-300 cursor-pointer anim-gradient" onClick={() => navigate(`/day/${displayDay}`)}>
                  Start Day {displayDay} →
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Progress */}
            <div className="glass-panel rounded-2xl p-4.5 border border-border-light">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold">Challenge Progress</h3>
                <span className="text-xs font-extrabold text-blue">{progressPercent}%</span>
              </div>
              <div className="h-1.5 bg-fg/6 rounded-full overflow-hidden mb-2 relative">
                <div className="h-full bg-linear-to-r from-blue via-purple to-cyan anim-gradient transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-fg-dark">
                <span>Day {isCompleted ? displayDay : displayDay - 1}</span>
                <span>Day 60</span>
              </div>
            </div>

            {/* Peer Pod */}
            <div className="glass-panel rounded-2xl p-4.5 border border-border-light">
              <div className="flex justify-between items-center mb-3.5">
                <h3 className="text-xs font-bold flex items-center gap-2">
                  <Users className="w-4.5 h-4.5 text-blue" /> Your Peer Pod
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green rounded-full relative after:content-[''] after:absolute after:-inset-0.5 after:rounded-full after:bg-green anim-ring-pulse"></span>
                  </span>
                </h3>
                <span className="text-[10px] text-fg-dark">3 online</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3 p-3 bg-fg/4 rounded-xl hover:bg-fg/8 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-bg bg-linear-to-br from-red to-orange">AS</div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-fg mb-0.5">Ananya Sharma</h4>
                    <p className="text-[10px] text-fg-dark">Just submitted Day 12 · 2m ago</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-orange">
                    <Flame className="w-4 h-4 fill-orange text-orange" /> 14
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-fg/4 rounded-xl hover:bg-fg/8 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-bg bg-linear-to-br from-green to-cyan">VP</div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-fg mb-0.5">Vikram Patel</h4>
                    <p className="text-[10px] text-fg-dark">Working on Day 12 · 15m ago</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-orange">
                    <Flame className="w-4 h-4 fill-orange text-orange" /> 11
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-fg/4 rounded-xl hover:bg-fg/8 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-bg bg-linear-to-br from-purple to-magenta">SK</div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-fg mb-0.5">Sneha Kumar</h4>
                    <p className="text-[10px] text-fg-dark">Completed Day 11 · 1h ago</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-orange">
                    <Flame className="w-4 h-4 fill-orange text-orange" /> 9
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-panel rounded-2xl p-4.5 border border-border-light">
              <h3 className="text-xs font-bold mb-3.5 flex items-center gap-1.5">
                <Award className="w-4.5 h-4.5 text-purple" /> Achievements
              </h3>
              <div className="grid grid-cols-4 gap-2.5">
                <div className="text-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-orange/12 group-hover:scale-110 hover:shadow-lg transition-all duration-300">
                    <Flame className="w-6 h-6 text-orange fill-orange" />
                  </div>
                  <p className="text-[9px] text-fg-dark font-semibold uppercase tracking-wider">7-Day</p>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-green/12 group-hover:scale-110 hover:shadow-lg transition-all duration-300 text-base">
                    🚀
                  </div>
                  <p className="text-[9px] text-fg-dark font-semibold uppercase tracking-wider">Deploy</p>
                </div>
                <div className="text-center badge-locked">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-fg/6 text-base">
                    💎
                  </div>
                  <p className="text-[9px] text-fg-dark font-semibold uppercase tracking-wider">30-Day</p>
                </div>
                <div className="text-center badge-locked">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-fg/6 text-base">
                    👑
                  </div>
                  <p className="text-[9px] text-fg-dark font-semibold uppercase tracking-wider">Top 10%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 2. LEADERBOARD TAB */}
      {activeTab === 'board' && (
        <div className="px-5 py-4 max-w-220 mx-auto anim-scaleIn">
          <div className="py-4 text-center">
            <h1 className="text-xl font-extrabold mb-1 tracking-wide bg-linear-to-r from-blue via-purple to-cyan bg-clip-text text-transparent flex items-center justify-center gap-2">&gt;_ GLOBALS_LEADERBOARD <Trophy className="w-5 h-5 text-yellow" /></h1>
            <p className="text-fg-dark text-xs">// Cohort v0.7 top active streakers</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-border-light shadow-lg">
            <div className="flex flex-col gap-3.5">
              {combinedLeaderboard.map((peer, idx) => (
                <div 
                  key={peer.name} 
                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 ${idx < 3 ? 'bg-linear-to-r from-surface/80 to-surface border-blue/20 hover:border-blue' : 'bg-surface/40 border-border hover:bg-surface/60'}`}
                >
                  <div className="text-sm font-extrabold text-blue w-6">{idx + 1}.</div>
                  <div className={`w-9.5 h-9.5 rounded-lg flex items-center justify-center text-xs font-black text-bg bg-linear-to-br ${peer.color}`}>
                    {peer.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-fg">{peer.name}</span>
                      <span className="text-[8px] bg-blue/10 border border-blue/20 text-cyan px-2 py-0.5 rounded-full font-bold">{peer.badge}</span>
                    </div>
                    <span className="text-[10px] text-fg-dark">{peer.track} Track · {peer.completed} completed</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-orange">
                    <Flame className="w-4 h-4 fill-orange text-orange" /> {peer.streak}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PROFILE TAB */}
      {activeTab === 'profile' && (
        <div className="px-5 py-4 max-w-160 mx-auto anim-scaleIn">
          <div className="py-4 text-center">
            <h1 className="text-xl font-extrabold mb-1 tracking-wide bg-linear-to-r from-blue via-purple to-cyan bg-clip-text text-transparent">&gt;_ PROFILE_DASHBOARD</h1>
            <p className="text-fg-dark text-xs">// User settings, streak shields, and account controls</p>
          </div>

          <div className="flex flex-col gap-5">
            {/* User Avatar Card */}
            <div className="glass-panel rounded-2xl p-6 border border-border-light relative overflow-hidden flex flex-col items-center sm:flex-row sm:items-start gap-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue/5 rounded-full blur-3xl"></div>
              <div className="w-18 h-18 rounded-2xl bg-linear-to-br from-blue via-purple to-cyan flex items-center justify-center text-bg text-xl font-black border-2 border-blue/45 shadow-blue-glow">
                {initials}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h2 className="text-lg font-black text-fg">{user?.name}</h2>
                  <span className="self-center text-[9px] bg-blue/15 text-blue border border-blue/30 px-2 py-0.5 rounded-full font-bold uppercase">Cohort v0.7</span>
                </div>
                <p className="text-xs text-fg-muted italic mb-3">{user?.email}</p>
                <div className="text-[10px] text-fg-dark font-bold uppercase tracking-wider flex flex-wrap justify-center sm:justify-start gap-2">
                  <span>🚀 {challenge?.challenge_name} Track</span>
                  <span>·</span>
                  <span>📅 Day {displayDay} of 60</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="glass-panel rounded-2xl p-5 border border-border-light">
              <h3 className="text-xs font-bold text-blue uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Performance stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface/30 border border-border/60 rounded-xl p-4 text-center hover:bg-surface/50 transition-all flex flex-col items-center">
                  <span className="text-[10px] text-fg-dark font-bold uppercase block mb-1">Current Streak</span>
                  <span className="text-xl font-black text-orange flex items-center gap-1"><Flame className="w-5 h-5 fill-orange text-orange" /> {displayStreak} days</span>
                </div>
                <div className="bg-surface/30 border border-border/80 rounded-xl p-4 text-center hover:bg-surface/50 transition-all flex flex-col items-center">
                  <span className="text-[10px] text-fg-dark font-bold uppercase block mb-1">Longest Streak</span>
                  <span className="text-xl font-black text-purple flex items-center gap-1"><Trophy className="w-5 h-5 text-purple" /> {user?.longest_streak || 0} days</span>
                </div>
              </div>
            </div>

            {/* Social linkages */}
            <div className="glass-panel rounded-2xl p-5 border border-border-light">
              <h3 className="text-xs font-bold text-blue uppercase tracking-wider mb-4 border-b border-border pb-2 flex items-center gap-2">
                <Users className="w-4 h-4" /> Account linkages
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center bg-surface/30 border border-border/80 rounded-xl p-3.5">
                  <span className="text-xs font-bold text-fg-muted flex items-center gap-2">
                    <Github className="w-4 h-4 text-fg" /> GitHub Profile
                  </span>
                  <span className="text-[10px] text-green font-bold">// linked</span>
                </div>
                <div className="flex justify-between items-center bg-surface/30 border border-border/80 rounded-xl p-3.5">
                  <span className="text-xs font-bold text-fg-muted flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue" /> LinkedIn Profile
                  </span>
                  <span className="text-[10px] text-green font-bold">// linked</span>
                </div>
              </div>
            </div>

            {/* Logout Action */}
            <div className="glass-panel rounded-2xl p-5 border border-border-light">
              <h3 className="text-xs font-bold text-red uppercase tracking-wider mb-3.5 border-b border-border pb-2 flex items-center gap-2">
                <LogOut className="w-4 h-4 text-red" /> Session management
              </h3>
              <p className="text-[11px] text-fg-dark mb-4">Disconnecting will log you out of your current cohort session.</p>
              <button 
                onClick={handleLogout} 
                className="w-full py-3.5 bg-red/10 border border-red/35 text-red font-bold rounded-xl text-xs hover:bg-red hover:text-bg transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" /> $ disconnect_session --terminate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Tabs with Emojis */}
      {/* Bottom Navigation Tabs with Lucide Icons */}
      <nav className="bottom-nav">
        <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>
        <button className="nav-item" onClick={() => navigate(`/day/${displayDay}`)}>
          <ClipboardCheck className="w-5 h-5 mb-0.5" />
          <span>Today</span>
        </button>
        <button className={`nav-item ${activeTab === 'board' ? 'active' : ''}`} onClick={() => setActiveTab('board')}>
          <Trophy className="w-5 h-5 mb-0.5" />
          <span>Leaderboard</span>
        </button>
        <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
