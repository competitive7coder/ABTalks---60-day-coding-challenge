import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ mockUser, setMockUser, challengeDays, edgeCase, setEdgeCase }) {
  const navigate = useNavigate();
  const [showBuddyPopup, setShowBuddyPopup] = useState(true);

  // Compute values based on edgeCase state
  const isNewbie = edgeCase === 'newbie';
  const isMissed = edgeCase === 'missed';
  const isCompleted = edgeCase === 'completed';

  const displayStreak = isNewbie ? 0 : (isMissed ? 0 : mockUser.currentStreak);
  const displayDay = isNewbie ? 1 : 12;
  const currentTask = challengeDays.find(d => d.day === displayDay) || {};

  // Calculate progress percent
  const progressPercent = Math.round(((displayDay - (isCompleted ? 0 : 1)) / mockUser.totalDays) * 100);

  // Get days list to render in calendar card
  const renderedDays = challengeDays.slice(0, 20).map(d => {
    if (isNewbie) {
      if (d.day === 1) return { ...d, current: true, completed: false, missed: false };
      return { ...d, current: false, completed: false, missed: false, upcoming: true };
    }
    if (isMissed) {
      if (d.day === 11) return { ...d, completed: false, missed: true };
      if (d.day === 12) return { ...d, current: true, completed: false, missed: false };
    }
    if (isCompleted && d.day === 12) {
      return { ...d, completed: true, current: false };
    }
    return d;
  });

  return (
    <div className="min-h-screen bg-bg text-fg font-mono relative overflow-x-hidden selection:bg-blue/30 selection:text-blue pb-22.5 md:pb-10">
      <div className="ambient-glow glow-1 -right-15 top-20 bg-blue anim-float"></div>
      <div className="ambient-glow glow-2 -left-20 top-100 bg-purple anim-float" style={{ animationDelay: '2s' }}></div>

      {/* State testing panel */}
      <div className="fixed top-3 left-3 bg-bg-dark/95 border border-purple rounded-xl p-3 z-999 shadow-[0_4px_24px_rgba(187,154,247,0.25)] max-w-62.5">
        <h4 className="text-[11px] font-extrabold text-purple uppercase tracking-wider mb-2 border-b border-purple/20 pb-1">State Controller</h4>
        <button className={`w-full py-1.5 px-2.5 mb-1.5 text-left rounded-md text-[10px] border border-border transition-all cursor-pointer ${edgeCase === 'default' ? 'bg-green/15 text-green border-green' : 'bg-white/5 text-fg-muted hover:bg-blue/15 hover:text-blue'}`} onClick={() => setEdgeCase('default')}>1. Default (Day 12)</button>
        <button className={`w-full py-1.5 px-2.5 mb-1.5 text-left rounded-md text-[10px] border border-border transition-all cursor-pointer ${edgeCase === 'newbie' ? 'bg-green/15 text-green border-green' : 'bg-white/5 text-fg-muted hover:bg-blue/15 hover:text-blue'}`} onClick={() => setEdgeCase('newbie')}>2. First Day (No Streak)</button>
        <button className={`w-full py-1.5 px-2.5 mb-1.5 text-left rounded-md text-[10px] border border-border transition-all cursor-pointer ${edgeCase === 'missed' ? 'bg-green/15 text-green border-green' : 'bg-white/5 text-fg-muted hover:bg-blue/15 hover:text-blue'}`} onClick={() => setEdgeCase('missed')}>3. Missed Day</button>
        <button className={`w-full py-1.5 px-2.5 mb-1.5 text-left rounded-md text-[10px] border border-border transition-all cursor-pointer ${edgeCase === 'completed' ? 'bg-green/15 text-green border-green' : 'bg-white/5 text-fg-muted hover:bg-blue/15 hover:text-blue'}`} onClick={() => setEdgeCase('completed')}>4. Today Completed</button>
      </div>

      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-bg/75 backdrop-blur-2xl z-50 border-b border-border">
        <div className="flex items-center gap-2.5 font-extrabold text-base cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-7.5 h-7.5 bg-linear-to-br from-blue to-purple rounded-lg flex items-center justify-center relative overflow-hidden shadow-blue-glow animate-pulse">
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span>ABTalks</span>
        </div>
        <div className="w-8.5 h-8.5 rounded-lg bg-linear-to-br from-blue to-purple flex items-center justify-center font-bold text-[11px] text-bg border-2 border-blue/45 shadow-blue-glow hover:scale-110 transition-all duration-300 cursor-pointer" onClick={() => navigate('/')}>
          {mockUser.initials}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 px-5 py-4 md:grid-cols-[2fr_1.2fr] md:gap-6 md:px-10 md:py-6 max-w-300 mx-auto">
        <div className="flex flex-col gap-4">
          <div className="py-2.5 anim-fadeUp">
            <h1 className="text-xl font-extrabold mb-1">&gt; hey_{mockUser.name}<span className="inline-block w-0.5 h-5 bg-green ml-0.5 animate-pulse align-middle"></span></h1>
            <p className="text-fg-dark text-xs">// Day {displayDay} of 60 · {mockUser.trackName} Track</p>
          </div>

          {/* Recovery Banner */}
          {!isNewbie && (isMissed || mockUser.recoveryAvailable) && !isCompleted && (
            <div className="bg-linear-to-r from-orange/10 to-red/10 border border-orange/25 p-4 rounded-xl flex items-center gap-3 relative overflow-hidden shadow-orange-glow animate-pulse">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-linear-to-b from-orange to-red"></div>
              <div className="w-9 h-9 bg-orange/15 rounded-lg flex items-center justify-center shrink-0 animate-bounce">
                <svg className="w-4.5 h-4.5 stroke-orange stroke-[2.5] fill-none" viewBox="0 0 24 24">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold mb-0.5 text-fg">Streak Recovery Available</h4>
                <p className="text-fg-dark text-[10px] leading-relaxed">
                  {isMissed ? "You missed Day 11. Complete a 30-min catch-up to save your streak!" : "Your Day 11 submission is pending verification. Recover it now!"}
                </p>
              </div>
              <button className="py-2 px-3.5 bg-linear-to-r from-orange to-yellow text-bg font-bold rounded-lg text-[11px] hover:-translate-y-0.5 hover:shadow-orange-glow transition-all duration-300 cursor-pointer" onClick={() => setEdgeCase('default')}>Recover</button>
            </div>
          )}

          {/* Streak Card */}
          <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-5 relative z-10">
              <div>
                <h2 className="text-[10px] color-blue font-bold tracking-wider uppercase mb-1.5">Current Streak</h2>
                <div className="text-4xl font-extrabold bg-linear-to-r from-blue to-cyan bg-clip-text text-transparent">{displayStreak}</div>
                <div className="text-fg-dark text-[11px] mt-1.5">
                  days strong // Best: {mockUser.bestStreak}
                  {displayStreak >= 10 && <span className="text-cyan ml-2">🛡️ Shield Active</span>}
                </div>
              </div>
              <div className="text-4xl filter drop-shadow-orange-glow anim-flame">
                <svg className={`w-11 h-11 ${displayStreak > 0 ? 'fill-orange' : 'fill-fg-dark'}`} viewBox="0 0 24 24">
                  <path d="M12 2c0 0-7 4-7 11v1c0 2.5 2 4.5 4.5 4.5S14 16.5 14 14c0-1.5-1-2.5-1-4 0-2 2-3 2-3s-3 1-3 4c0 1.5 1 2.5 1 4 0 2.5-2 4.5-4.5 4.5S6 16.5 6 14v-1c0-4 3-7 6-11z" />
                </svg>
              </div>
            </div>
            <div className="calendar relative z-10">
              {renderedDays.map((day) => (
                <div
                  key={day.day}
                  className={`calendar-day ${day.completed ? 'day-done' : ''} ${day.missed ? 'day-missed' : ''} ${day.current ? 'day-today' : ''} ${day.upcoming ? 'day-upcoming' : 'day-empty'}`}
                  onClick={() => navigate(`/day/${day.day}`)}
                >
                  {day.day}
                </div>
              ))}
            </div>
          </div>

          {/* Today's Task */}
          <div className="glass-panel rounded-2xl p-5 relative overflow-hidden border-t-2 border-t-blue">
            <div className="flex justify-between items-center mb-3.5">
              <span className="inline-flex items-center gap-1.5 bg-blue/12 text-blue px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                <svg className="w-3 h-3 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {mockUser.trackName}
              </span>
              <span className="text-fg-dark text-[10px] flex items-center gap-1">
                <svg className="w-3.5 h-3.5 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {currentTask.duration || "~2 hrs"}
              </span>
            </div>
            <h3 className="text-base font-bold mb-2 leading-snug">{currentTask.title}</h3>
            <p className="text-fg-dark text-xs leading-relaxed mb-3.5">{currentTask.description || "Build a responsive interface using framework layout styles."}</p>
            <div className="flex gap-3 mb-4 flex-wrap">
              <span className="text-[10px] text-fg-dark flex items-center gap-1 font-medium">
                <svg className="w-3 h-3 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                {currentTask.difficulty || "Medium"}
              </span>
              <span className="text-[10px] text-fg-dark flex items-center gap-1 font-medium">
                <svg className="w-3 h-3 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                React, CSS
              </span>
              <span className="text-[10px] text-fg-dark flex items-center gap-1 font-medium">
                <svg className="w-3 h-3 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                Deploy
              </span>
            </div>
            {isCompleted ? (
              <button className="w-full py-3.5 bg-linear-to-r from-green to-[#9ece6acc] text-bg font-bold rounded-xl text-xs hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" onClick={() => navigate(`/day/${displayDay}`)}>
                ✓ challenge_completed
              </button>
            ) : (
              <button className="w-full py-3.5 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-xs shadow-blue-glow hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--blue-glow)] transition-all duration-300 cursor-pointer anim-gradient" onClick={() => navigate(`/day/${displayDay}`)}>
                $ start_day --id={displayDay}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Progress */}
          <div className="glass-panel rounded-2xl p-4.5">
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
          <div className="glass-panel rounded-2xl p-4.5">
            <div className="flex justify-between items-center mb-3.5">
              <h3 className="text-xs font-bold flex items-center gap-2">
                <svg className="w-3.5 h-3.5 stroke-fg-muted stroke-2 fill-none" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
                Your Peer Pod
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
                  <svg className="w-3 h-3 fill-orange anim-flame" viewBox="0 0 24 24"><path d="M12 2c0 0-7 4-7 11v1c0 2.5 2 4.5 4.5 4.5S14 16.5 14 14c0-1.5-1-2.5-1-4 0-2 2-3 2-3s-3 1-3 4c0 1.5 1 2.5 1 4 0 2.5-2 4.5-4.5 4.5S6 16.5 6 14v-1c0-4 3-7 6-11z" /></svg>
                  14
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-fg/4 rounded-xl hover:bg-fg/8 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-bg bg-linear-to-br from-green to-cyan">VP</div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-fg mb-0.5">Vikram Patel</h4>
                  <p className="text-[10px] text-fg-dark">Working on Day 12 · 15m ago</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-orange">
                  <svg className="w-3 h-3 fill-orange anim-flame" viewBox="0 0 24 24"><path d="M12 2c0 0-7 4-7 11v1c0 2.5 2 4.5 4.5 4.5S14 16.5 14 14c0-1.5-1-2.5-1-4 0-2 2-3 2-3s-3 1-3 4c0 1.5 1 2.5 1 4 0 2.5-2 4.5-4.5 4.5S6 16.5 6 14v-1c0-4 3-7 6-11z" /></svg>
                  11
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-fg/4 rounded-xl hover:bg-fg/8 hover:translate-x-1 transition-all duration-300 cursor-pointer">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-bg bg-linear-to-br from-purple to-magenta">SK</div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-fg mb-0.5">Sneha Kumar</h4>
                  <p className="text-[10px] text-fg-dark">Completed Day 11 · 1h ago</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-orange">
                  <svg className="w-3 h-3 fill-orange anim-flame" viewBox="0 0 24 24"><path d="M12 2c0 0-7 4-7 11v1c0 2.5 2 4.5 4.5 4.5S14 16.5 14 14c0-1.5-1-2.5-1-4 0-2 2-3 2-3s-3 1-3 4c0 1.5 1 2.5 1 4 0 2.5-2 4.5-4.5 4.5S6 16.5 6 14v-1c0-4 3-7 6-11z" /></svg>
                  9
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-panel rounded-2xl p-4.5">
            <h3 className="text-xs font-bold mb-3.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 stroke-yellow stroke-2 fill-none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
              Achievements
            </h3>
            <div className="grid grid-cols-4 gap-2.5">
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-orange/12 group-hover:scale-110 hover:shadow-lg transition-all duration-300">
                  <svg className="w-5.5 h-5.5 fill-orange filter drop-shadow-orange-glow" viewBox="0 0 24 24"><path d="M12 2c0 0-7 4-7 11v1c0 2.5 2 4.5 4.5 4.5S14 16.5 14 14c0-1.5-1-2.5-1-4 0-2 2-3 2-3s-3 1-3 4c0 1.5 1 2.5 1 4 0 2.5-2 4.5-4.5 4.5S6 16.5 6 14v-1c0-4 3-7 6-11z" /></svg>
                </div>
                <p className="text-[9px] text-fg-dark font-semibold uppercase tracking-wider">7-Day</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-green/12 group-hover:scale-110 hover:shadow-lg transition-all duration-300">
                  <svg className="w-5.5 h-5.5 stroke-green stroke-2 fill-none filter drop-shadow-green-glow" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></svg>
                </div>
                <p className="text-[9px] text-fg-dark font-semibold uppercase tracking-wider">Deploy</p>
              </div>
              <div className="text-center badge-locked">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-fg/6">
                  <svg className="w-5.5 h-5.5 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /></svg>
                </div>
                <p className="text-[9px] text-fg-dark font-semibold uppercase tracking-wider">30-Day</p>
              </div>
              <div className="text-center badge-locked">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 bg-fg/6">
                  <svg className="w-5.5 h-5.5 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                </div>
                <p className="text-[9px] text-fg-dark font-semibold uppercase tracking-wider">Top 10%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="code-deco text-center text-[10px] text-fg-dark py-3">
        <span className="comment">// </span><span className="keyword">const</span> nextMilestone = <span className="string">"30-day streak"</span>;
      </div>

      {showBuddyPopup && (
        <div className="fixed bottom-23.75 right-4 bg-surface/95 backdrop-blur-md border border-cyan shadow-[0_8px_32px_rgba(125,207,255,0.25)] rounded-xl p-3 max-w-65 z-150 anim-fadeUp">
          <div className="flex justify-between items-center mb-1.5">
            <h5 className="text-[10px] text-cyan font-bold">⚡ Late-Night Coding Energy</h5>
            <button className="bg-none border-none text-fg-dark cursor-pointer text-xs" onClick={() => setShowBuddyPopup(false)}>×</button>
          </div>
          <div className="text-[10px] leading-relaxed text-fg-muted">
            <strong>842 college students</strong> are coding along with you right now across India. Keep pushing!
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item active" onClick={() => navigate('/dashboard')}>
          <svg className="nav-icon stroke-current" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          <span>Home</span>
        </button>
        <button className="nav-item" onClick={() => navigate(`/day/${displayDay}`)}>
          <svg className="nav-icon stroke-current" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
          <span>Today</span>
        </button>
        <button className="nav-item">
          <svg className="nav-icon stroke-current" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>
          <span>Board</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/')}>
          <svg className="nav-icon stroke-current" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
