import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ChallengeDay({ mockUser, setMockUser, challengeDays, edgeCase, setEdgeCase, day12Completed, setDay12Completed }) {
  const navigate = useNavigate();
  const { dayId } = useParams();
  const currentDayNum = Number(dayId) || 12;

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch current task info
  const task = challengeDays.find(d => d.day === currentDayNum) || {};

  const handleSub = (e) => {
    e.preventDefault();
    if (!githubUrl || !linkedinUrl) {
      alert("Please provide both your GitHub commit and LinkedIn post URL.");
      return;
    }
    
    // Simulate successful submission
    setDay12Completed(true);
    setToastMessage(`Day ${currentDayNum} completed! Streak saved.`);
    setShowToast(true);
    
    // Update user stats
    setMockUser(prev => ({
      ...prev,
      currentStreak: prev.currentStreak + 1,
      totalDaysCompleted: prev.totalDaysCompleted + 1
    }));
    
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handlePrevDay = () => {
    if (currentDayNum > 1) {
      navigate(`/day/${currentDayNum - 1}`);
    }
  };

  const handleNextDay = () => {
    if (currentDayNum < 60) {
      navigate(`/day/${currentDayNum + 1}`);
    }
  };

  // Check state modifiers based on edgecase toggler
  const isNewbie = edgeCase === 'newbie';
  const displayStreak = isNewbie ? 0 : mockUser.currentStreak;

  return (
    <div className="min-h-screen bg-bg text-fg font-mono relative overflow-x-hidden selection:bg-blue/30 selection:text-blue pb-22.5 md:pb-10">
      <div className="ambient-glow glow-1 -right-20 top-15 bg-blue anim-float"></div>
      <div className="ambient-glow glow-2 -left-25 top-125 bg-purple anim-float" style={{ animationDelay: '2s' }}></div>
      <div className="ambient-glow glow-3 -right-15 bottom-50 bg-cyan anim-float" style={{ animationDelay: '4s' }}></div>

      {/* State testing panel */}
      <div className="fixed top-3 left-3 bg-bg-dark/95 border border-purple rounded-xl p-3 z-999 shadow-[0_4px_24px_rgba(187,154,247,0.25)] max-w-62.5">
        <h4 className="text-[11px] font-extrabold text-purple uppercase tracking-wider mb-2 border-b border-purple/20 pb-1">State Controller</h4>
        <button className={`w-full py-1.5 px-2.5 mb-1.5 text-left rounded-md text-[10px] border border-border transition-all cursor-pointer ${edgeCase === 'default' ? 'bg-green/15 text-green border-green' : 'bg-white/5 text-fg-muted hover:bg-blue/15 hover:text-blue'}`} onClick={() => setEdgeCase('default')}>1. Default (Day 12)</button>
        <button className={`w-full py-1.5 px-2.5 mb-1.5 text-left rounded-md text-[10px] border border-border transition-all cursor-pointer ${edgeCase === 'newbie' ? 'bg-green/15 text-green border-green' : 'bg-white/5 text-fg-muted hover:bg-blue/15 hover:text-blue'}`} onClick={() => setEdgeCase('newbie')}>2. First Day (No Streak)</button>
        <button className={`w-full py-1.5 px-2.5 mb-1.5 text-left rounded-md text-[10px] border border-border transition-all cursor-pointer ${edgeCase === 'missed' ? 'bg-green/15 text-green border-green' : 'bg-white/5 text-fg-muted hover:bg-blue/15 hover:text-blue'}`} onClick={() => setEdgeCase('missed')}>3. Missed Day</button>
        <button className={`w-full py-1.5 px-2.5 mb-1.5 text-left rounded-md text-[10px] border border-border transition-all cursor-pointer ${edgeCase === 'completed' ? 'bg-green/15 text-green border-green' : 'bg-white/5 text-fg-muted hover:bg-blue/15 hover:text-blue'}`} onClick={() => setEdgeCase('completed')}>4. Today Completed</button>
      </div>

      <header className="flex items-center gap-2.5 px-4 py-3.5 sticky top-0 bg-bg/75 backdrop-blur-2xl z-50 border-b border-border">
        <button className="w-8.5 h-8.5 bg-surface-glass backdrop-blur-md border border-border-light rounded-lg flex items-center justify-center text-fg hover:border-blue hover:-translate-x-0.5 transition-all duration-300 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <svg className="w-4.5 h-4.5 stroke-fg stroke-[2.5] fill-none" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-bold">Day {currentDayNum}</h1>
          <p className="text-[10px] text-fg-dark">{mockUser.trackName} Track</p>
        </div>
        <span className="inline-flex items-center gap-1 bg-blue/12 text-blue px-2.5 py-1.5 rounded-lg text-[10px] font-bold">
          <svg className="w-3.5 h-3.5 fill-orange anim-bounce-subtle" viewBox="0 0 24 24">
            <path d="M12 2c0 0-7 4-7 11v1c0 2.5 2 4.5 4.5 4.5S14 16.5 14 14c0-1.5-1-2.5-1-4 0-2 2-3 2-3s-3 1-3 4c0 1.5 1 2.5 1 4 0 2.5-2 4.5-4.5 4.5S6 16.5 6 14v-1c0-4 3-7 6-11z" />
          </svg>
          {displayStreak} Streak
        </span>
      </header>

      <div className="grid grid-cols-1 gap-5 px-5 py-4 md:grid-cols-[2fr_1.2fr] md:gap-6 md:px-10 md:py-6 max-w-300 mx-auto">
        <div className="flex flex-col gap-4">
          <div className="py-7 px-4 text-center bg-blue/8 rounded-2xl relative">
            <div className="text-5xl font-extrabold bg-linear-to-r from-blue via-purple to-cyan bg-clip-text text-transparent anim-gradient mb-2">{currentDayNum}</div>
            <h2 className="text-lg font-bold mb-2 leading-snug">{task.title || "Loading task details..."}</h2>
            <div className="flex justify-center gap-3.5 mt-2.5">
              <span className="text-[11px] text-fg-dark flex items-center gap-1">
                <svg className="w-3 h-3 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                {task.duration || "~2 hours"}
              </span>
              <span className="text-[11px] text-fg-dark flex items-center gap-1">
                <svg className="w-3 h-3 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><path d="M2 20h20" /><path d="M5 20v-8a2 2 0 0 1 4 0v8" /><path d="M11 20V4a2 2 0 0 1 4 0v16" /></svg>
                {task.difficulty || "Medium"}
              </span>
              <span className="text-[11px] text-fg-dark flex items-center gap-1">
                <svg className="w-3 h-3 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                React, CSS
              </span>
            </div>
          </div>

          {/* Task Description */}
          <div className="glass-panel rounded-2xl p-4.5 relative overflow-hidden border-t border-blue/50">
            <h3 className="text-[11px] text-blue font-bold tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              The Mission
            </h3>
            <p className="text-xs leading-relaxed text-fg-dark mb-3.5">{task.description || "Submit daily proof-of-work to keep your progress active."}</p>

            <h3 className="text-[11px] text-blue font-bold tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /></svg>
              Requirements
            </h3>
            <ul className="mb-2.5 list-none">
              {task.requirements ? task.requirements.map((req, index) => (
                <li key={index} className="pl-5.5 py-1.5 relative text-xs text-fg-dark border-b border-fg/4 last:border-none hover:text-fg-muted hover:pl-6.5 transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3.5 before:h-3.5 before:bg-green before:rounded-sm after:content-[''] after:absolute after:left-1 after:top-1/2 after:-translate-y-1/2 after:rotate-45 after:w-1 after:h-1.5 after:border-b-2 after:border-r-2 after:border-bg">{req}</li>
              )) : (
                <li className="pl-5.5 py-1.5 relative text-xs text-fg-dark before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3.5 before:h-3.5 before:bg-green before:rounded-sm after:content-[''] after:absolute after:left-1 after:top-1/2 after:-translate-y-1/2 after:rotate-45 after:w-1 after:h-1.5 after:border-b-2 after:border-r-2 after:border-bg">Follow spec guides closely.</li>
              )}
            </ul>

            {task.proTip && (
              <div className="bg-linear-to-r from-blue/8 to-purple/6 border border-blue/20 rounded-lg p-3.5 my-3 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-0.5 before:h-full before:bg-linear-to-b before:from-blue before:to-purple">
                <h4 className="text-xs font-bold mb-1.5 text-fg flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 stroke-yellow stroke-2 fill-none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                  Pro Tip
                </h4>
                <p className="text-[11px] leading-relaxed text-fg-dark">{task.proTip}</p>
              </div>
            )}

            <h3 className="text-[11px] text-blue font-bold tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /></svg>
              Acceptance Criteria
            </h3>
            <ul className="list-none">
              {task.acceptanceCriteria ? task.acceptanceCriteria.map((act, index) => (
                <li key={index} className="pl-5.5 py-1.5 relative text-xs text-fg-dark border-b border-fg/4 last:border-none hover:text-fg-muted hover:pl-6.5 transition-all duration-300 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3.5 before:h-3.5 before:bg-green before:rounded-sm after:content-[''] after:absolute after:left-1 after:top-1/2 after:-translate-y-1/2 after:rotate-45 after:w-1 after:h-1.5 after:border-b-2 after:border-r-2 after:border-bg">{act}</li>
              )) : (
                <li className="pl-5.5 py-1.5 relative text-xs text-fg-dark before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3.5 before:h-3.5 before:bg-green before:rounded-sm after:content-[''] after:absolute after:left-1 after:top-1/2 after:-translate-y-1/2 after:rotate-45 after:w-1 after:h-1.5 after:border-b-2 after:border-r-2 after:border-bg">Working live link verified.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Resources */}
          <div className="glass-panel rounded-2xl p-4.5">
            <h3 className="text-[11px] text-blue font-bold tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /></svg>
              Resources
            </h3>
            {task.resources ? task.resources.map((res, index) => (
              <a href={res.url} className="flex items-center gap-2.5 p-3 bg-fg/4 rounded-xl border border-transparent hover:bg-fg/8 hover:border-border-light hover:translate-x-1 transition-all duration-300 mb-2 last:mb-0" key={index}>
                <div className="w-8.5 h-8.5 bg-blue/12 rounded-lg flex items-center justify-center shrink-0 hover:scale-110 hover:bg-blue/20 transition-all">
                  <svg className="w-4 h-4 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-fg mb-0.5">{res.title}</h4>
                  <p className="text-[10px] text-fg-dark">{res.type === 'video' ? 'Video' : 'Article'} · {res.duration}</p>
                </div>
                <span className="text-fg-dark hover:translate-x-1 hover:text-blue transition-all">
                  <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
              </a>
            )) : (
              <p className="text-xs text-fg-dark">No resources specified.</p>
            )}
          </div>

          {/* Submission Form */}
          <div className="glass-panel rounded-2xl p-4.5">
            <h3 className="text-[11px] text-blue font-bold tracking-wider uppercase mb-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13" /></svg>
              Submit Your Work
            </h3>
            <p className="text-[11px] text-fg-dark mb-3.5">Share your GitHub commit and LinkedIn post to complete Day {currentDayNum}</p>

            {(day12Completed || edgeCase === 'completed') ? (
              <div className="bg-green/12 border border-green p-3 rounded-lg text-green text-xs font-bold text-center">
                ✓ Today's challenge is completed. Keep up the momentum!
              </div>
            ) : (
              <form onSubmit={handleSub} className="flex flex-col gap-3.5">
                <div className="form-group">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold mb-1.5 text-fg-muted">
                    <svg className="w-3.5 h-3.5 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    GitHub Repository / Commit
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={e => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repo/commit/abc123"
                    className="w-full p-3 bg-bg border border-border rounded-xl text-fg text-xs focus:outline-none focus:border-blue transition-all"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold mb-1.5 text-fg-muted">
                    <svg className="w-3.5 h-3.5 stroke-fg-dark stroke-2 fill-none" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /></svg>
                    LinkedIn Post URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={e => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/posts/username_abc123"
                    className="w-full p-3 bg-bg border border-border rounded-xl text-fg text-xs focus:outline-none focus:border-blue transition-all"
                    required
                  />
                </div>

                <button type="submit" className="w-full py-3.5 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-xs shadow-blue-glow hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer anim-gradient">
                  $ complete_day --id={currentDayNum}
                </button>
              </form>
            )}
          </div>

          {/* Peer Activity */}
          <div className="glass-panel rounded-2xl p-4.5">
            <h3 className="text-[11px] text-blue font-bold tracking-wider uppercase mb-2.5 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /></svg>
              Pod Activity
              <span className="w-1.5 h-1.5 bg-green rounded-full relative after:content-[''] after:absolute after:-inset-0.5 after:rounded-full after:bg-green anim-ring-pulse ml-1"></span>
            </h3>
            <div className="flex items-center gap-2.5 p-2.5 bg-fg/4 rounded-xl hover:bg-fg/8 hover:translate-x-1 transition-all duration-300 mb-2">
              <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-xs font-bold text-bg bg-linear-to-br from-red to-orange">AS</div>
              <div className="flex-1">
                <p className="text-xs text-fg-muted"><strong>Ananya Sharma</strong> completed Day {currentDayNum}</p>
                <span className="text-[10px] text-fg-dark">2 minutes ago · 14 streak</span>
              </div>
              <span className="py-1 px-2 rounded bg-green/15 text-green text-[9px] font-bold uppercase">Done</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 bg-fg/4 rounded-xl hover:bg-fg/8 hover:translate-x-1 transition-all duration-300">
              <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-xs font-bold text-bg bg-linear-to-br from-green to-cyan">VP</div>
              <div className="flex-1">
                <p className="text-xs text-fg-muted"><strong>Vikram Patel</strong> is building...</p>
                <span className="text-[10px] text-fg-dark">15 minutes ago · 11 streak</span>
              </div>
              <span className="py-1 px-2 rounded bg-orange/15 text-orange text-[9px] font-bold uppercase">Building</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Navigation */}
      <div className="flex gap-2.5 mx-4 my-6">
        <button className="flex-1 py-3 bg-surface-glass backdrop-blur-md border border-border rounded-xl text-fg text-xs font-bold flex items-center justify-center gap-1.5 hover:border-border-light hover:-translate-y-0.5 transition-all cursor-pointer" onClick={handlePrevDay}>
          <svg className="w-3.5 h-3.5 stroke-fg stroke-[2.5] fill-none" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
          Day {currentDayNum > 1 ? currentDayNum - 1 : 1}
        </button>
        <button className="flex-1 py-3 bg-linear-to-r from-blue to-purple text-bg text-xs font-bold flex items-center justify-center gap-1.5 shadow-blue-glow hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer anim-gradient" onClick={handleNextDay}>
          Day {currentDayNum < 60 ? currentDayNum + 1 : 60}
          <svg className="w-3.5 h-3.5 stroke-bg stroke-[2.5] fill-none" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div className="code-deco text-center text-[10px] text-fg-dark py-3">
        <span className="comment">// </span><span className="func">console</span>.<span className="func">log</span>(<span className="string">"Keep building!"</span>);
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => navigate('/dashboard')}>
          <svg className="nav-icon stroke-current" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          <span>Home</span>
        </button>
        <button className="nav-item active" onClick={() => navigate(`/day/${currentDayNum}`)}>
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

      {/* Floating success toast */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        {toastMessage}
      </div>
    </div>
  );
}
