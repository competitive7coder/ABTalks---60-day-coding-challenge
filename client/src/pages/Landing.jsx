import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing({ setMockUser }) {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('hey_rahul');
  const [track, setTrack] = useState('web-dev');

  const handleLogin = (e) => {
    e.preventDefault();
    setMockUser(prev => ({
      ...prev,
      name: username,
      initials: username.substring(0, 2).toUpperCase(),
      track: track,
      trackName: track === 'web-dev' ? 'Web Development' : track === 'ai-ml' ? 'AI / ML' : track === 'mobile' ? 'Mobile Development' : 'DSA & Algorithms',
    }));
    setShowAuthModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg text-fg font-mono relative overflow-x-hidden selection:bg-blue/30 selection:text-blue">
      {/* Background Glows */}
      <div className="ambient-glow glow-1 -right-15 top-20 bg-blue anim-float"></div>
      <div className="ambient-glow glow-2 -left-20 top-100 bg-purple anim-float" style={{ animationDelay: '2s' }}></div>
      <div className="ambient-glow glow-3 -right-15 bottom-50 bg-cyan anim-float" style={{ animationDelay: '4s' }}></div>

      <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-bg/75 backdrop-blur-2xl z-50 border-b border-border md:px-10">
        <div className="flex items-center gap-2.5 font-extrabold text-lg">
          <div className="w-7.5 h-7.5 bg-linear-to-br from-blue to-purple rounded-lg flex items-center justify-center relative overflow-hidden shadow-blue-glow animate-pulse">
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span>ABTalks</span>
        </div>
        <button 
          className="px-4 py-2 bg-surface-glass backdrop-blur-md border border-border-light text-fg rounded-xl text-xs font-semibold hover:border-blue hover:shadow-blue-glow hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          onClick={() => { setIsSignUp(false); setShowAuthModal(true); }}
        >
          &gt;_ login
        </button>
      </header>

      <div className="max-w-97.5 mx-auto px-5 pb-8 relative z-10 md:max-w-300 md:px-10 md:pb-12">
        <section className="py-10 text-center relative md:py-20 md:max-w-200 md:mx-auto anim-fadeUp">
          <div className="inline-flex items-center gap-2 bg-surface-glass backdrop-blur-md border border-border-light text-green px-4 py-2 rounded-xl text-[11px] font-bold mb-6 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-green rounded-full shadow-green-glow animate-ping"></span>
            Cohort_07 // Live
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter mb-4 md:text-6xl md:leading-none">
            Build in Public.<br />
            <span className="bg-linear-to-r from-blue via-purple to-cyan bg-clip-text text-transparent anim-gradient">Get Hired.</span>
          </h1>
          <p className="text-fg-muted text-sm leading-relaxed mb-7 md:text-lg">
            Join 10,000+ Indian college students in a 60-day coding challenge. Build daily, post publicly, and make yourself impossible to ignore.
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:gap-4 md:max-w-115 md:mx-auto">
            <button 
              className="w-full py-4 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-sm shadow-blue-glow hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--blue-glow)] active:translate-y-0 transition-all duration-300 cursor-pointer relative overflow-hidden anim-gradient"
              onClick={() => { setIsSignUp(true); setShowAuthModal(true); }}
            >
              $ start-challenge --now
            </button>
            <a 
              href="#how" 
              className="w-full py-3.5 bg-surface-glass backdrop-blur-md border border-border-light text-fg font-semibold rounded-xl text-xs text-center hover:border-purple hover:shadow-purple-glow transition-all duration-300"
            >
              $ man how-it-works
            </a>
          </div>
        </section>

        <div className="flex justify-around py-5 bg-surface-glass backdrop-blur-xl rounded-2xl border border-border relative overflow-hidden md:max-w-225 md:mx-auto md:p-7 md:mb-10">
          <div className="text-center">
            <div className="text-2xl font-extrabold bg-linear-to-br from-blue to-purple bg-clip-text text-transparent anim-bounce-subtle">60</div>
            <div className="text-fg-dark text-[9px] mt-1.5 tracking-wider uppercase font-semibold">Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold bg-linear-to-br from-blue to-purple bg-clip-text text-transparent anim-bounce-subtle" style={{ animationDelay: '0.5s' }}>12K+</div>
            <div className="text-fg-dark text-[9px] mt-1.5 tracking-wider uppercase font-semibold">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold bg-linear-to-br from-blue to-purple bg-clip-text text-transparent anim-bounce-subtle" style={{ animationDelay: '1s' }}>400+</div>
            <div className="text-fg-dark text-[9px] mt-1.5 tracking-wider uppercase font-semibold">Hired</div>
          </div>
        </div>

        <div className="flex justify-center py-2.5 mb-4 animate-bounce">
          <svg className="w-5 h-5 stroke-fg-dark fill-none stroke-2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>

        <div className="py-4 text-center">
          <div className="flex justify-center mb-3">
            <div className="flex">
              <div className="w-9 h-9 rounded-xl border-2 border-bg bg-linear-to-br from-blue to-purple flex items-center justify-center text-xs font-bold text-bg z-5 hover:-translate-y-1 hover:scale-110 transition-all duration-300 cursor-pointer">A</div>
              <div className="w-9 h-9 rounded-xl border-2 border-bg bg-linear-to-br from-red to-orange flex items-center justify-center text-xs font-bold text-bg -ml-2.5 z-4 hover:-translate-y-1 hover:scale-110 transition-all duration-300 cursor-pointer">R</div>
              <div className="w-9 h-9 rounded-xl border-2 border-bg bg-linear-to-br from-green to-cyan flex items-center justify-center text-xs font-bold text-bg -ml-2.5 z-3 hover:-translate-y-1 hover:scale-110 transition-all duration-300 cursor-pointer">K</div>
              <div className="w-9 h-9 rounded-xl border-2 border-bg bg-linear-to-br from-purple to-magenta flex items-center justify-center text-xs font-bold text-bg -ml-2.5 z-2 hover:-translate-y-1 hover:scale-110 transition-all duration-300 cursor-pointer">S</div>
              <div className="w-9 h-9 rounded-xl border-2 border-bg bg-elevated flex items-center justify-center text-[9px] font-bold text-bg -ml-2.5 z-1 hover:-translate-y-1 hover:scale-110 transition-all duration-300 cursor-pointer">+9k</div>
            </div>
          </div>
          <p className="text-fg-dark text-[11px] leading-relaxed">
            Joined by students from <strong>IIT Bombay, BITS Pilani, NIT Trichy</strong><br />and 500+ colleges across India
          </p>
        </div>

        <section className="py-6" id="how">
          <h2 className="text-base font-bold text-center mb-5 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-linear-to-r after:from-blue after:to-purple after:mx-auto after:mt-2 after:rounded">How It Works</h2>
          <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-5">
            <div className="glass-panel rounded-2xl p-4.5 flex gap-3.5 items-start hover:translate-x-1 hover:border-border-light hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="w-8 h-8 bg-linear-to-br from-blue to-purple rounded-lg flex items-center justify-center font-extrabold text-xs text-bg shadow-blue-glow group-hover:scale-110 transition-transform duration-300">01</div>
              <div className="flex-1">
                <h3 className="text-xs font-bold mb-1 text-fg">Pick Your Track</h3>
                <p className="text-fg-dark text-[11px] leading-relaxed">Choose from Web Dev, AI/ML, Mobile, or DSA. Each track has a curated 60-day roadmap.</p>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-4.5 flex gap-3.5 items-start hover:translate-x-1 hover:border-border-light hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="w-8 h-8 bg-linear-to-br from-blue to-purple rounded-lg flex items-center justify-center font-extrabold text-xs text-bg shadow-blue-glow group-hover:scale-110 transition-transform duration-300">02</div>
              <div className="flex-1">
                <h3 className="text-xs font-bold mb-1 text-fg">Build Daily</h3>
                <p className="text-fg-dark text-[11px] leading-relaxed">Get a new task every day. Submit a GitHub commit + LinkedIn post as proof of work.</p>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-4.5 flex gap-3.5 items-start hover:translate-x-1 hover:border-border-light hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="w-8 h-8 bg-linear-to-br from-blue to-purple rounded-lg flex items-center justify-center font-extrabold text-xs text-bg shadow-blue-glow group-hover:scale-110 transition-transform duration-300">03</div>
              <div className="flex-1">
                <h3 className="text-xs font-bold mb-1 text-fg">Get Noticed</h3>
                <p className="text-fg-dark text-[11px] leading-relaxed">Your public streak becomes your portfolio. Recruiters actively scout our leaderboard.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="code-deco text-center text-[10px] text-fg-dark py-3">
          <span className="comment">// </span><span>const</span> tracks = [<span className="comment">"web", "ai", "mobile", "dsa"</span>];
        </div>

        <section className="py-6">
          <h2 className="text-base font-bold text-center mb-5 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-linear-to-r after:from-blue after:to-purple after:mx-auto after:mt-2 after:rounded">Choose Your Track</h2>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
            <div 
              className="glass-panel rounded-2xl p-5 text-center cursor-pointer hover:-translate-y-1.5 hover:border-blue hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_30px_var(--blue-glow)] transition-all duration-300 relative overflow-hidden group"
              onClick={() => { setTrack('web-dev'); setShowAuthModal(true); setIsSignUp(true); }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 bg-blue/10 group-hover:scale-115 group-hover:-rotate-6 transition-transform duration-300">
                <svg className="w-5.5 h-5.5 stroke-blue stroke-2 fill-none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h4 className="text-xs font-bold mb-1 text-fg relative z-10">Web Dev</h4>
              <p className="text-fg-dark text-[10px] relative z-10">Full-stack projects</p>
            </div>
            <div 
              className="glass-panel rounded-2xl p-5 text-center cursor-pointer hover:-translate-y-1.5 hover:border-blue hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_30px_var(--blue-glow)] transition-all duration-300 relative overflow-hidden group"
              onClick={() => { setTrack('ai-ml'); setShowAuthModal(true); setIsSignUp(true); }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 bg-purple/10 group-hover:scale-115 group-hover:-rotate-6 transition-transform duration-300">
                <svg className="w-5.5 h-5.5 stroke-purple stroke-2 fill-none" viewBox="0 0 24 24">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.387-1 1.732V7h1a7 7 0 0 1 7 7h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a7 7 0 0 1 7-7h1V5.732A2.001 2.001 0 0 1 12 2z" />
                </svg>
              </div>
              <h4 className="text-xs font-bold mb-1 text-fg relative z-10">AI / ML</h4>
              <p className="text-fg-dark text-[10px] relative z-10">Models & apps</p>
            </div>
            <div 
              className="glass-panel rounded-2xl p-5 text-center cursor-pointer hover:-translate-y-1.5 hover:border-blue hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_30px_var(--blue-glow)] transition-all duration-300 relative overflow-hidden group"
              onClick={() => { setTrack('mobile'); setShowAuthModal(true); setIsSignUp(true); }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 bg-cyan/10 group-hover:scale-115 group-hover:-rotate-6 transition-transform duration-300">
                <svg className="w-5.5 h-5.5 stroke-cyan stroke-2 fill-none" viewBox="0 0 24 24">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <h4 className="text-xs font-bold mb-1 text-fg relative z-10">Mobile</h4>
              <p className="text-fg-dark text-[10px] relative z-10">iOS & Android</p>
            </div>
            <div 
              className="glass-panel rounded-2xl p-5 text-center cursor-pointer hover:-translate-y-1.5 hover:border-blue hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_30px_var(--blue-glow)] transition-all duration-300 relative overflow-hidden group"
              onClick={() => { setTrack('dsa'); setShowAuthModal(true); setIsSignUp(true); }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 bg-orange/10 group-hover:scale-115 group-hover:-rotate-6 transition-transform duration-300">
                <svg className="w-5.5 h-5.5 stroke-orange stroke-2 fill-none" viewBox="0 0 24 24">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h4 className="text-xs font-bold mb-1 text-fg relative z-10">DSA</h4>
              <p className="text-fg-dark text-[10px] relative z-10">Interview prep</p>
            </div>
          </div>
        </section>

        <section className="py-6">
          <h2 className="text-base font-bold text-center mb-5 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-linear-to-r after:from-blue after:to-purple after:mx-auto after:mt-2 after:rounded">Why Students Love It</h2>
          <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
            <span className="absolute top-2 right-4 text-5xl font-extrabold text-blue opacity-15">"</span>
            <p className="text-xs leading-relaxed text-fg-muted italic relative z-10">
              "I got 3 interview calls just from my LinkedIn posts during the challenge. The streak kept me accountable when nothing else worked."
            </p>
            <div className="flex items-center gap-2.5 mt-3.5">
              <div className="w-8.5 h-8.5 rounded-lg bg-linear-to-br from-blue to-purple flex items-center justify-center text-xs font-bold text-bg">PK</div>
              <div>
                <div className="text-xs font-bold text-fg">Priya Kumar</div>
                <div className="text-[10px] text-fg-dark">Placed at Google // 60-day streak</div>
              </div>
            </div>
          </div>
        </section>

        <div className="py-8">
          <button 
            className="w-full py-4 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-sm shadow-blue-glow hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--blue-glow)] transition-all duration-300 cursor-pointer anim-gradient"
            onClick={() => { setIsSignUp(true); setShowAuthModal(true); }}
          >
            $ join --cohort=07 --free
          </button>
        </div>

        <div className="code-deco text-center text-[10px] text-fg-dark py-2">
          <span className="comment">// </span><span>while</span>(alive) &#123;<span className="comment"> code(); learn(); grow(); </span>&#125;
        </div>

        <footer className="py-7 text-center border-t border-border">
          <p className="text-fg-dark text-[10px]">ABTalks &copy; 2026 // Built for Indian students</p>
        </footer>
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 bg-[#0a0b10]/85 backdrop-blur-md flex items-center justify-center z-1000" onClick={() => setShowAuthModal(false)}>
          <div className="bg-bg-dark border border-border-light rounded-2xl w-[90%] max-w-90 p-6 shadow-2xl anim-scaleIn" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold mb-1.5">&gt;_ {isSignUp ? 'sign-up' : 'sign-in'}</h2>
            <p className="text-[11px] text-fg-dark mb-5">{isSignUp ? 'Create your profile to start coding' : 'Log in to your 60-day dashboard'}</p>
            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              <div>
                <label className="text-[11px] font-bold mb-1.5 flex items-center gap-1 text-fg-muted">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="e.g. hey_rahul"
                  className="w-full px-3.5 py-3 bg-bg border border-border rounded-xl text-fg text-xs focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue-glow transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] font-bold mb-1.5 flex items-center gap-1 text-fg-muted">Choose Track</label>
                <select
                  value={track}
                  onChange={e => setTrack(e.target.value)}
                  className="w-full px-3.5 py-3 bg-bg border border-border rounded-xl text-fg text-xs focus:outline-none focus:border-blue transition-all"
                  style={{ fontFamily: 'inherit' }}
                >
                  <option value="web-dev">Web Development</option>
                  <option value="ai-ml">AI / ML</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="dsa">DSA & Algorithms</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3.5 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-xs shadow-blue-glow hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer anim-gradient" style={{ marginTop: '10px' }}>
                $ {isSignUp ? 'initialize_challenge' : 'start_session'}
              </button>
            </form>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--blue)',
                fontSize: '11px',
                marginTop: '15px',
                cursor: 'pointer',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New student? Sign Up'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
