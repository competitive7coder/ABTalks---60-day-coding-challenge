import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn, createChallenge } from '../api';

export default function Landing({ setMockUser }) {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('hey_rahul');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [track, setTrack] = useState('web-dev');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [testStreak, setTestStreak] = useState([true, true, true, false, false, false, false]);
  const [terminalHistory, setTerminalHistory] = useState([
    { text: 'Welcome to ABTalks OS v0.7. Type "help" to start.', type: 'info' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const alphabet = "01STARTHACKATHONCOHORTCHALLENGEABTALKSSTREAK";
    const fontSize = 11;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const rainDrops = Array(columns).fill(1);

    const drawRain = () => {
      ctx.fillStyle = 'rgba(11, 14, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const char = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillStyle = i % 2 === 0 ? 'rgba(59, 130, 246, 0.25)' : 'rgba(139, 92, 246, 0.25)'; // glowing translucent blue and purple rain
        ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(drawRain, 40);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let newHistory = [...terminalHistory, { text: `➜ /challenge/cohort-07 [master] $ ${terminalInput}`, type: 'command' }];

    if (cmd === 'help') {
      newHistory = [
        ...newHistory,
        { text: '🛠️ ABTalks Command Center Help Directory:', type: 'info' },
        { text: '  ├── 🚀 tracks  - View active curriculum configurations', type: 'response' },
        { text: '  ├── 📖 about   - Show 60-day challenge rule handbook', type: 'response' },
        { text: '  ├── ⚡ start   - Launch student enrollment sequence', type: 'response' },
        { text: '  └── 🧹 clear   - Purge history logs', type: 'response' }
      ];
    } else if (cmd === 'tracks') {
      newHistory = [
        ...newHistory,
        { text: '📁 tracks/', type: 'info' },
        { text: '  ├── 💻 Full Stack (React, Node, DB) [60 days]', type: 'response' },
        { text: '  ├── 🎨 Frontend (UI/UX & React) [60 days]', type: 'response' },
        { text: '  └── ⚙️ Backend (APIs & Database) [60 days]', type: 'response' }
      ];
    } else if (cmd === 'about') {
      newHistory = [
        ...newHistory,
        { text: '┌── ℹ️ CHALLENGE MATRIX ───────────────────────────────────┐', type: 'info' },
        { text: '│ 📅 60 Days: Compile project submissions every day.        │', type: 'info' },
        { text: '│ 🤝 Connect: Auto-verify commits & LinkedIn proof urls.   │', type: 'info' },
        { text: '│ 📈 Compete: Gain streak points, scale live leaderboards. │', type: 'info' },
        { text: '└──────────────────────────────────────────────────────────┘', type: 'info' }
      ];
    } else if (cmd === 'start') {
      newHistory.push({ text: '⚡ Launching enrollment portal registry module...', type: 'success' });
      setIsSignUp(true);
      setShowAuthModal(true);
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      newHistory.push({ text: `❌ bash: command not found: "${cmd}". Enter "help" for options.`, type: 'error' });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (isSignUp) {
        // Register the user
        await signUp(username, email, password);
        
        // Save selected track to local storage so it gets created once they sign in
        sessionStorage.setItem('chosen_track', track);

        setSuccessMsg('Registration successful! Please sign in.');
        setIsSignUp(false);
      } else {
        // Just log in
        const loginRes = await signIn(email, password);
        setShowAuthModal(false);
        // Admins go directly to their panel; everyone else goes to dashboard
        if (loginRes?.data?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during authentication');
    }
  };

  return (
    <div className="min-h-screen bg-bg text-fg font-sans relative overflow-x-hidden selection:bg-blue/30 selection:text-blue">
      <canvas id="matrix-canvas" className="absolute inset-0 pointer-events-none opacity-4 z-0"></canvas>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center py-10 md:py-16">
          <section className="text-center md:text-left relative anim-fadeUp">
            <div className="inline-flex items-center gap-2 bg-surface-glass backdrop-blur-md border border-border-light text-green px-4 py-2 rounded-xl text-[11px] font-bold mb-6 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-green rounded-full shadow-green-glow animate-ping"></span>
              Cohort_07 // Live
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter mb-4 md:text-5xl md:leading-none">
              Build in Public.<br />
              <span className="bg-linear-to-r from-blue via-purple to-cyan bg-clip-text text-transparent anim-gradient">Get Hired.</span>
            </h1>
            <p className="text-fg-muted text-sm leading-relaxed mb-7 md:text-base">
              Join 10,000+ Indian college students in a 60-day coding challenge. Build daily, post publicly, and make yourself impossible to ignore.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:max-w-115">
              <button 
                className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-sm shadow-blue-glow hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--blue-glow)] active:translate-y-0 transition-all duration-300 cursor-pointer relative overflow-hidden anim-gradient"
                onClick={() => { setIsSignUp(true); setShowAuthModal(true); }}
              >
                $ start-challenge --now
              </button>
              <a 
                href="#how" 
                className="w-full sm:w-auto px-8 py-4 bg-surface-glass backdrop-blur-md border border-border-light text-fg font-semibold rounded-xl text-xs flex items-center justify-center hover:border-purple hover:shadow-purple-glow transition-all duration-300"
              >
                $ man how-it-works
              </a>
            </div>
          </section>

          {/* Interactive Live Terminal Widget */}
          <div className="glass-panel border border-border-light rounded-2xl shadow-2xl relative overflow-hidden hidden md:block max-w-135 mx-auto w-full anim-scaleIn">
            <div className="bg-bg-dark px-4 py-3 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow/80"></div>
                <div className="w-3 h-3 rounded-full bg-green/80"></div>
                <span className="text-[10px] text-fg-dark ml-2 font-mono">abtalks_shell.sh</span>
              </div>
              <span className="text-[9px] bg-green/12 text-green px-2 py-0.5 rounded font-mono font-bold animate-pulse">online</span>
            </div>
            <div className="p-4 font-mono text-[10.5px] leading-relaxed text-fg-muted h-64 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
              {terminalHistory.map((item, idx) => (
                <div 
                  key={idx} 
                  className={
                    item.type === 'command' ? 'text-fg font-bold drop-shadow-[0_0_8px_rgba(241,245,249,0.15)]' : 
                    item.type === 'response' ? 'text-fg-muted/80' : 
                    item.type === 'success' ? 'text-green font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 
                    item.type === 'error' ? 'text-red font-bold' : 'text-cyan font-semibold'
                  }
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {item.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="bg-bg-dark/60 border-t border-border flex items-center px-4 py-3.5">
              <span className="text-fg-dark font-mono text-xs select-none mr-2">➜ /challenge/cohort-07 [master] $</span>
              <input 
                type="text" 
                value={terminalInput} 
                onChange={(e) => setTerminalInput(e.target.value)} 
                placeholder="Type 'help' and press Enter..." 
                className="flex-1 bg-transparent border-none outline-hidden text-xs text-green font-mono caret-green p-0"
              />
            </form>
          </div>
        </div>

        {/* Stats Section: Cybernetic Status Panel */}
        <div className="grid grid-cols-3 gap-3.5 py-6 px-4 bg-surface-glass backdrop-blur-xl rounded-2xl border border-border relative overflow-hidden md:max-w-225 md:mx-auto md:p-6 md:mb-10 hover:border-blue/20 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-blue via-purple to-cyan"></div>
          <div className="text-center relative">
            <span className="absolute top-0 right-1 w-1 h-1 bg-green rounded-full anim-ring-pulse"></span>
            <div className="text-2xl font-black bg-linear-to-br from-blue to-purple bg-clip-text text-transparent anim-bounce-subtle">60</div>
            <div className="text-fg-dark text-[9px] mt-1 tracking-wider uppercase font-extrabold">// DAYS</div>
          </div>
          <div className="text-center relative border-x border-border/60">
            <span className="absolute top-0 right-1 w-1 h-1 bg-green rounded-full anim-ring-pulse"></span>
            <div className="text-2xl font-black bg-linear-to-br from-blue to-purple bg-clip-text text-transparent anim-bounce-subtle" style={{ animationDelay: '0.3s' }}>12K+</div>
            <div className="text-fg-dark text-[9px] mt-1 tracking-wider uppercase font-extrabold">// STUDENTS</div>
          </div>
          <div className="text-center relative">
            <span className="absolute top-0 right-1 w-1 h-1 bg-green rounded-full anim-ring-pulse"></span>
            <div className="text-2xl font-black bg-linear-to-br from-blue to-purple bg-clip-text text-transparent anim-bounce-subtle" style={{ animationDelay: '0.6s' }}>400+</div>
            <div className="text-fg-dark text-[9px] mt-1 tracking-wider uppercase font-extrabold">// HIRED</div>
          </div>
        </div>

        <div className="py-4 text-center">
          <div className="flex justify-center mb-3">
            <div className="flex p-1.5 bg-surface/30 rounded-2xl border border-border-light">
              <div className="w-8.5 h-8.5 rounded-xl border border-bg bg-linear-to-br from-blue to-purple flex items-center justify-center text-xs font-bold text-bg z-5 hover:-translate-y-1 transition-all cursor-pointer">A</div>
              <div className="w-8.5 h-8.5 rounded-xl border border-bg bg-linear-to-br from-red to-orange flex items-center justify-center text-xs font-bold text-bg -ml-2 z-4 hover:-translate-y-1 transition-all cursor-pointer">R</div>
              <div className="w-8.5 h-8.5 rounded-xl border border-bg bg-linear-to-br from-green to-cyan flex items-center justify-center text-xs font-bold text-bg -ml-2 z-3 hover:-translate-y-1 transition-all cursor-pointer">K</div>
              <div className="w-8.5 h-8.5 rounded-xl border border-bg bg-linear-to-br from-purple to-magenta flex items-center justify-center text-xs font-bold text-bg -ml-2 z-2 hover:-translate-y-1 transition-all cursor-pointer">S</div>
              <div className="w-8.5 h-8.5 rounded-xl border border-bg bg-elevated flex items-center justify-center text-[8px] font-bold text-fg-muted -ml-2 z-1 hover:-translate-y-1 transition-all cursor-pointer">+9k</div>
            </div>
          </div>
          <p className="text-fg-dark text-[10.5px] leading-relaxed">
            Joined by students from <strong className="text-fg-muted">IIT Bombay, BITS Pilani, NIT Trichy</strong><br />and 500+ colleges across India
          </p>
        </div>

        {/* How It Works: connected roadmap flow */}
        <section className="py-8" id="how">
          <h2 className="text-base font-black text-center mb-6 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-linear-to-r after:from-blue after:to-purple after:mx-auto after:mt-2 after:rounded uppercase tracking-wide">How It Works</h2>
          <div className="relative flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-6">
            {/* Dotted path connector for large displays */}
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-border-light -z-1"></div>
            
            <div className="glass-panel rounded-2xl p-5 flex gap-3.5 items-start hover:border-blue/35 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="w-8.5 h-8.5 bg-linear-to-br from-blue to-purple rounded-xl flex items-center justify-center font-black text-xs text-bg shadow-blue-glow group-hover:scale-105 transition-transform duration-300">01</div>
              <div className="flex-1">
                <h3 className="text-xs font-extrabold mb-1 text-fg">Pick Your Track</h3>
                <p className="text-fg-dark text-[11px] leading-relaxed">Choose from Web Dev, AI/ML, Mobile, or DSA. Each track has a curated 60-day roadmap.</p>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5 flex gap-3.5 items-start hover:border-purple/35 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="w-8.5 h-8.5 bg-linear-to-br from-blue to-purple rounded-xl flex items-center justify-center font-black text-xs text-bg shadow-blue-glow group-hover:scale-105 transition-transform duration-300">02</div>
              <div className="flex-1">
                <h3 className="text-xs font-extrabold mb-1 text-fg">Build Daily</h3>
                <p className="text-fg-dark text-[11px] leading-relaxed">Get a new task every day. Submit a GitHub commit + LinkedIn post as proof of work.</p>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-5 flex gap-3.5 items-start hover:border-cyan/35 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="w-8.5 h-8.5 bg-linear-to-br from-blue to-purple rounded-xl flex items-center justify-center font-black text-xs text-bg shadow-blue-glow group-hover:scale-105 transition-transform duration-300">03</div>
              <div className="flex-1">
                <h3 className="text-xs font-extrabold mb-1 text-fg">Get Noticed</h3>
                <p className="text-fg-dark text-[11px] leading-relaxed">Your public streak becomes your portfolio. Recruiters actively scout our leaderboard.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="code-deco text-center text-[10px] text-fg-dark py-3 font-mono">
          <span className="comment">// </span><span>const</span> tracks = [<span className="comment">"web", "ai", "mobile", "dsa"</span>];
        </div>

        <section className="py-6">
          <h2 className="text-base font-black text-center mb-6 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-linear-to-r after:from-blue after:to-purple after:mx-auto after:mt-2 after:rounded uppercase tracking-wide">Choose Your Track</h2>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3 md:gap-5 max-w-250 mx-auto">
            <div 
              className="glass-panel rounded-2xl p-5 text-left cursor-pointer border border-border/80 hover:border-blue hover:shadow-[0_0_20px_var(--blue-glow)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
              onClick={() => { setTrack('Full Stack'); setShowAuthModal(true); setIsSignUp(true); }}
            >
              <div className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-green rounded-full anim-ring-pulse"></div>
              <div className="text-[10px] text-blue font-bold tracking-wider mb-2 font-mono">$ init --fullstack</div>
              <h4 className="text-xs font-black text-fg mb-1">Full Stack</h4>
              <p className="text-fg-dark text-[10px] mb-3">MERN Stack Development</p>
              <div className="text-[9px] text-fg-muted font-mono bg-bg-dark/50 p-1.5 rounded-lg border border-border-light">
                <div>Tasks: 60 tasks</div>
                <div>Avg Pay: 12 LPA</div>
              </div>
            </div>

            <div 
              className="glass-panel rounded-2xl p-5 text-left cursor-pointer border border-border/80 hover:border-purple hover:shadow-[0_0_20px_var(--purple-glow)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
              onClick={() => { setTrack('Frontend'); setShowAuthModal(true); setIsSignUp(true); }}
            >
              <div className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-green rounded-full anim-ring-pulse"></div>
              <div className="text-[10px] text-purple font-bold tracking-wider mb-2 font-mono">$ init --frontend</div>
              <h4 className="text-xs font-black text-fg mb-1">Frontend</h4>
              <p className="text-fg-dark text-[10px] mb-3">React, Tailwind, UI/UX</p>
              <div className="text-[9px] text-fg-muted font-mono bg-bg-dark/50 p-1.5 rounded-lg border border-border-light">
                <div>Tasks: 60 tasks</div>
                <div>Avg Pay: 10 LPA</div>
              </div>
            </div>

            <div 
              className="glass-panel rounded-2xl p-5 text-left cursor-pointer border border-border/80 hover:border-cyan hover:shadow-[0_0_20px_var(--cyan-glow)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
              onClick={() => { setTrack('Backend'); setShowAuthModal(true); setIsSignUp(true); }}
            >
              <div className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-green rounded-full anim-ring-pulse"></div>
              <div className="text-[10px] text-cyan font-bold tracking-wider mb-2 font-mono">$ init --backend</div>
              <h4 className="text-xs font-black text-fg mb-1">Backend</h4>
              <p className="text-fg-dark text-[10px] mb-3">Node.js, Express, DBs</p>
              <div className="text-[9px] text-fg-muted font-mono bg-bg-dark/50 p-1.5 rounded-lg border border-border-light">
                <div>Tasks: 60 tasks</div>
                <div>Avg Pay: 14 LPA</div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Streak Simulator Widget */}
        <section className="py-6">
          <div className="glass-panel rounded-2xl p-6 border border-border-light relative overflow-hidden max-w-160 mx-auto hover:border-orange/30 hover:shadow-[0_8px_32px_rgba(249,115,22,0.15)] transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-full blur-2xl"></div>
            <div className="text-center mb-5">
              <span className="inline-flex items-center gap-1.5 bg-orange/12 text-orange px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2 animate-pulse">
                ⚡ LIVE ACCOUNTABILITY SYSTEM
              </span>
              <h3 className="text-sm font-black text-fg uppercase tracking-wide">Accountability simulator</h3>
              <p className="text-[10.5px] text-fg-dark">Click squares to simulate task submissions and watch your rank update in real-time!</p>
            </div>

            <div className="flex justify-center gap-2.5 mb-5">
              {testStreak.map((completed, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const next = [...testStreak];
                    next[index] = !next[index];
                    setTestStreak(next);
                  }}
                  className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-pointer ${completed ? 'bg-linear-to-r from-orange to-yellow text-bg shadow-[0_0_15px_var(--orange-glow)] scale-110' : 'bg-surface border border-border text-fg-dark hover:border-orange/60'}`}
                >
                  {completed ? '🔥' : index + 1}
                </div>
              ))}
            </div>

            {/* Dynamic Level & Badge outputs */}
            <div className="bg-bg-dark/65 border border-border/80 rounded-xl p-3.5 text-center font-mono">
              <div className="text-[9px] text-fg-dark uppercase tracking-wider mb-1">// SYSTEM STATUS RANK</div>
              <div className="text-xs font-black text-fg mb-1">
                {testStreak.filter(Boolean).length <= 2 ? (
                  <span className="text-fg-muted">🌱 BRONZE_BUILDER</span>
                ) : testStreak.filter(Boolean).length <= 5 ? (
                  <span className="text-cyan">⚡ SILVER_SPEEDRUNNER</span>
                ) : (
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow to-orange anim-gradient font-black">🔥 GOLDEN_CHAMPION</span>
                )}
              </div>
              <div className="text-[10px] text-fg-muted/80">
                Active Streak: <span className="text-orange font-bold">{testStreak.filter(Boolean).length} Days Strong</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6">
          <h2 className="text-base font-black text-center mb-6 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-linear-to-r after:from-blue after:to-purple after:mx-auto after:mt-2 after:rounded uppercase tracking-wide">Why Students Love It</h2>
          <div className="glass-panel rounded-2xl p-5.5 relative overflow-hidden border border-border-light max-w-160 mx-auto">
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

        {/* Dynamic Footer CTA Block */}
        <div className="py-8 max-w-160 mx-auto">
          <div className="bg-bg-dark border border-border-light rounded-2xl p-5 mb-5 font-mono text-left relative overflow-hidden">
            <div className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-green rounded-full animate-ping"></div>
            <div className="text-fg-dark text-[10px] mb-2">// session_initialize.sh</div>
            <div className="text-fg text-xs font-bold mb-3 flex items-center gap-1.5">
              <span>$ ./join-challenge.sh --cohort=07</span>
              <span className="w-1.5 h-3.5 bg-green rounded-xs anim-ring-pulse"></span>
            </div>
            <div className="text-[10px] text-green">// [SUCCESS] ALL CHALLENGE CHANNELS LIVE AND OPEN FOR ENTRIES</div>
          </div>
          <button 
            className="w-full py-4.5 bg-linear-to-r from-blue to-purple text-bg font-extrabold rounded-xl text-sm shadow-blue-glow hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--blue-glow)] active:translate-y-0 transition-all duration-300 cursor-pointer anim-gradient uppercase tracking-wider"
            onClick={() => { setIsSignUp(true); setShowAuthModal(true); }}
          >
            $ join --cohort=07 --free
          </button>
        </div>

        <div className="code-deco text-center text-[10px] text-fg-dark py-2 font-mono">
          <span className="comment">// </span><span>while</span>(alive) &#123;<span className="comment"> code(); learn(); grow(); </span>&#125;
        </div>

        <footer className="py-7 text-center border-t border-border">
          <p className="text-fg-dark text-[10.5px]">ABTalks &copy; 2026 // Built for Indian students</p>
        </footer>
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 bg-[#0a0b10]/85 backdrop-blur-md flex items-center justify-center z-1000" onClick={() => setShowAuthModal(false)}>
          <div className="bg-bg-dark border border-border-light rounded-2xl w-[90%] max-w-90 p-6 shadow-2xl anim-scaleIn" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-extrabold mb-1.5">&gt;_ {isSignUp ? 'sign-up' : 'sign-in'}</h2>
            <p className="text-[11px] text-fg-dark mb-5">{isSignUp ? 'Create your profile to start coding' : 'Log in to your 60-day dashboard'}</p>
            
            {errorMsg && (
              <div className="bg-red/15 text-red border border-red/35 rounded-xl p-3 text-xs mb-4 font-bold">
                ⚠️ {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="bg-green/15 text-green border border-green/35 rounded-xl p-3 text-xs mb-4 font-bold">
                ✓ {successMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
              {isSignUp && (
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
              )}
              
              <div>
                <label className="text-[11px] font-bold mb-1.5 flex items-center gap-1 text-fg-muted">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. rahul@college.edu"
                  className="w-full px-3.5 py-3 bg-bg border border-border rounded-xl text-fg text-xs focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue-glow transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold mb-1.5 flex items-center gap-1 text-fg-muted">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-3 bg-bg border border-border rounded-xl text-fg text-xs focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue-glow transition-all"
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="text-[11px] font-bold mb-1.5 flex items-center gap-1 text-fg-muted">Choose Track</label>
                  <select
                    value={track}
                    onChange={e => setTrack(e.target.value)}
                    className="w-full px-3.5 py-3 bg-bg border border-border rounded-xl text-fg text-xs focus:outline-none focus:border-blue transition-all"
                    style={{ fontFamily: 'inherit' }}
                  >
                    <option value="Full Stack">Full Stack (Web Dev)</option>
                    <option value="Frontend">Frontend (UI/UX)</option>
                    <option value="Backend">Backend (APIs & DB)</option>
                    <option value="Administrator">Administrator / Teacher</option>
                  </select>
                </div>
              )}

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
