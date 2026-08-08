import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getAdminTasks, createAdminTask, updateAdminTask, deleteAdminTask, getAdminStats } from '../api';
import { 
  Home, 
  ArrowLeft,
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  FileText,
  Video,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'metrics'
  const [stats, setStats] = useState(null);

  // Form states
  const [editingId, setEditingId] = useState(null);
  const [day, setDay] = useState(1);
  const [track, setTrack] = useState('Full Stack');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  
  // Array dynamic fields
  const [requirements, setRequirements] = useState(['']);
  const [acceptanceCriteria, setAcceptanceCriteria] = useState(['']);
  const [resources, setResources] = useState([{ title: '', url: '', type: 'article', duration: '' }]);

  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('success');

  useEffect(() => {
    async function loadAdminData() {
      try {
        const userRes = await getCurrentUser();
        if (userRes.data?.role !== 'admin') {
          alert('Access denied. Admin access only.');
          navigate('/dashboard');
          return;
        }
        setUser(userRes.data);

        const tasksRes = await getAdminTasks();
        setTasks(tasksRes.tasks || []);

        const statsRes = await getAdminStats();
        setStats(statsRes);
      } catch (err) {
        console.error(err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, [navigate]);

  const showToast = (msg, type = 'success') => {
    setMessage(msg);
    setMsgType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleAddRequirement = () => setRequirements([...requirements, '']);
  const handleRemoveRequirement = (index) => setRequirements(requirements.filter((_, i) => i !== index));
  const handleRequirementChange = (index, val) => {
    const updated = [...requirements];
    updated[index] = val;
    setRequirements(updated);
  };

  const handleAddCriteria = () => setAcceptanceCriteria([...acceptanceCriteria, '']);
  const handleRemoveCriteria = (index) => setAcceptanceCriteria(acceptanceCriteria.filter((_, i) => i !== index));
  const handleCriteriaChange = (index, val) => {
    const updated = [...acceptanceCriteria];
    updated[index] = val;
    setAcceptanceCriteria(updated);
  };

  const handleAddResource = () => setResources([...resources, { title: '', url: '', type: 'article', duration: '' }]);
  const handleRemoveResource = (index) => setResources(resources.filter((_, i) => i !== index));
  const handleResourceChange = (index, key, val) => {
    const updated = [...resources];
    updated[index][key] = val;
    setResources(updated);
  };

  const resetForm = () => {
    setEditingId(null);
    setDay(tasks.length ? Math.max(...tasks.map(t => t.day)) + 1 : 1);
    setTrack('Full Stack');
    setTaskName('');
    setDescription('');
    setDifficulty('Medium');
    setRequirements(['']);
    setAcceptanceCriteria(['']);
    setResources([{ title: '', url: '', type: 'article', duration: '' }]);
  };

  const handleEdit = (taskObj) => {
    setEditingId(taskObj._id);
    setDay(taskObj.day);
    setTrack(taskObj.track || 'Full Stack');
    setTaskName(taskObj.task);
    setDescription(taskObj.description || '');
    setDifficulty(taskObj.difficulty_level || 'Medium');
    setRequirements(taskObj.requirements?.length ? taskObj.requirements : ['']);
    setAcceptanceCriteria(taskObj.acceptanceCriteria?.length ? taskObj.acceptanceCriteria : ['']);
    setResources(taskObj.resources?.length ? taskObj.resources : [{ title: '', url: '', type: 'article', duration: '' }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteAdminTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      showToast('Task deleted successfully');
    } catch (err) {
      showToast(err.message || 'Failed to delete task', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      day: Number(day),
      track: track,
      task: taskName,
      description,
      difficulty_level: difficulty,
      requirements: requirements.filter(r => r.trim() !== ''),
      acceptanceCriteria: acceptanceCriteria.filter(a => a.trim() !== ''),
      resources: resources.filter(res => res.title.trim() !== '' && res.url.trim() !== '')
    };

    try {
      if (editingId) {
        const res = await updateAdminTask(editingId, payload);
        setTasks(tasks.map(t => t._id === editingId ? res.task : t));
        showToast('Task updated successfully');
      } else {
        const res = await createAdminTask(payload);
        setTasks([...tasks, res.task].sort((a, b) => a.day - b.day));
        showToast('Task created successfully');
      }
      resetForm();
    } catch (err) {
      showToast(err.message || 'Failed to save task', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-fg font-sans flex items-center justify-center">
        <div className="text-sm select-none animate-pulse">&gt;_ loading_admin_dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg font-sans relative pb-16">
      {/* Background lights */}
      <div className="ambient-glow glow-1 -right-20 top-15 bg-blue/15 anim-float"></div>
      <div className="ambient-glow glow-2 -left-25 top-125 bg-purple/15 anim-float" style={{ animationDelay: '2s' }}></div>

      <header className="px-5 py-4 sticky top-0 bg-bg/75 backdrop-blur-2xl z-50 border-b border-border">
        <div className="flex justify-between items-center max-w-300 mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <button 
              className="w-8.5 h-8.5 bg-surface-glass backdrop-blur-md border border-border rounded-lg flex items-center justify-center text-fg hover:border-blue transition-all cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-sm font-bold">Admin Panel</h1>
              <p className="text-[10px] text-fg-dark">Manage Challenge Roadmap Tasks</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-purple/12 text-purple border border-purple/35 px-2.5 py-1.5 rounded-lg text-[10px] font-bold">
            👑 System Administrator
          </span>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-300 mx-auto px-5 mt-6 flex gap-4">
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'tasks' ? 'bg-blue/20 text-blue border border-blue/35' : 'bg-surface/30 text-fg-dark hover:bg-surface/50 border border-transparent'}`}
        >
          📚 Manage Tasks
        </button>
        <button 
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'metrics' ? 'bg-purple/20 text-purple border border-purple/35' : 'bg-surface/30 text-fg-dark hover:bg-surface/50 border border-transparent'}`}
        >
          📈 Cohort Metrics & Leaderboard
        </button>
      </div>

      {activeTab === 'tasks' && (
      <main className="max-w-300 mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-6">
        
        {/* LEFT COLUMN: Create/Edit Form */}
        <section className="flex flex-col gap-4">
          <div className="glass-panel rounded-2xl p-5 border border-border-light relative overflow-hidden">
            <h3 className="text-xs font-bold text-blue uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>{editingId ? 'Edit Task' : 'Create Task'}</span>
              {editingId && (
                <button onClick={resetForm} className="text-fg-dark hover:text-red flex items-center gap-1 text-[10px] font-bold uppercase cursor-pointer">
                  <X className="w-3 h-3" /> Cancel Edit
                </button>
              )}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-fg-dark block mb-1">Challenge Day</label>
                  <input 
                    type="number" 
                    value={day}
                    onChange={e => setDay(e.target.value)}
                    className="w-full p-2 bg-bg border border-border rounded-lg text-fg text-xs focus:outline-none focus:border-blue" 
                    required 
                    min="1"
                    max="60"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-fg-dark block mb-1">Track</label>
                  <select 
                    value={track} 
                    onChange={e => setTrack(e.target.value)}
                    className="w-full p-2 bg-bg border border-border rounded-lg text-fg text-xs focus:outline-none focus:border-blue"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="DSA">DSA</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-fg-dark block mb-1">Difficulty Level</label>
                  <select 
                    value={difficulty} 
                    onChange={e => setDifficulty(e.target.value)}
                    className="w-full p-2 bg-bg border border-border rounded-lg text-fg text-xs focus:outline-none focus:border-blue"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-fg-dark block mb-1">Task Title / Name</label>
                <input 
                  type="text" 
                  value={taskName}
                  onChange={e => setTaskName(e.target.value)}
                  placeholder="e.g. Build REST API Routes"
                  className="w-full p-2 bg-bg border border-border rounded-lg text-fg text-xs focus:outline-none focus:border-blue" 
                  required 
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-fg-dark block mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Explain the mission, goals, and daily requirements..."
                  className="w-full p-2 bg-bg border border-border rounded-lg text-fg text-xs focus:outline-none focus:border-blue min-h-20"
                />
              </div>

              {/* Requirements List */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-fg-dark block">Requirements</label>
                  <button type="button" onClick={handleAddRequirement} className="text-blue hover:text-blue-light text-[9px] font-black uppercase flex items-center gap-0.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {requirements.map((req, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        value={req}
                        onChange={e => handleRequirementChange(idx, e.target.value)}
                        placeholder={`Requirement ${idx + 1}`}
                        className="flex-1 p-2 bg-bg border border-border rounded-lg text-fg text-xs focus:outline-none focus:border-blue"
                      />
                      {requirements.length > 1 && (
                        <button type="button" onClick={() => handleRemoveRequirement(idx)} className="text-red/80 hover:text-red cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Acceptance Criteria List */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-fg-dark block">Acceptance Criteria</label>
                  <button type="button" onClick={handleAddCriteria} className="text-blue hover:text-blue-light text-[9px] font-black uppercase flex items-center gap-0.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {acceptanceCriteria.map((ac, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        value={ac}
                        onChange={e => handleCriteriaChange(idx, e.target.value)}
                        placeholder={`Criteria ${idx + 1}`}
                        className="flex-1 p-2 bg-bg border border-border rounded-lg text-fg text-xs focus:outline-none focus:border-blue"
                      />
                      {acceptanceCriteria.length > 1 && (
                        <button type="button" onClick={() => handleRemoveCriteria(idx)} className="text-red/80 hover:text-red cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources List */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-fg-dark block">Resources & Links</label>
                  <button type="button" onClick={handleAddResource} className="text-blue hover:text-blue-light text-[9px] font-black uppercase flex items-center gap-0.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Resource
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {resources.map((res, idx) => (
                    <div key={idx} className="p-3 bg-fg/4 border border-border rounded-xl flex flex-col gap-2 relative">
                      {resources.length > 1 && (
                        <button type="button" onClick={() => handleRemoveResource(idx)} className="absolute top-2 right-2 text-red/80 hover:text-red cursor-pointer">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div>
                        <label className="text-[8px] font-bold text-fg-dark block mb-0.5">Resource Title</label>
                        <input 
                          type="text" 
                          value={res.title}
                          onChange={e => handleResourceChange(idx, 'title', e.target.value)}
                          placeholder="e.g. Express Routing Guide"
                          className="w-full p-1.5 bg-bg border border-border rounded-lg text-fg text-[11px] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-fg-dark block mb-0.5">URL</label>
                        <input 
                          type="url" 
                          value={res.url}
                          onChange={e => handleResourceChange(idx, 'url', e.target.value)}
                          placeholder="https://..."
                          className="w-full p-1.5 bg-bg border border-border rounded-lg text-fg-[11px] text-[11px] focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-bold text-fg-dark block mb-0.5">Type</label>
                          <select 
                            value={res.type} 
                            onChange={e => handleResourceChange(idx, 'type', e.target.value)}
                            className="w-full p-1.5 bg-bg border border-border rounded-lg text-fg text-[11px] focus:outline-none"
                          >
                            <option value="article">Article</option>
                            <option value="video">Video</option>
                            <option value="documentation">Docs</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[8px] font-bold text-fg-dark block mb-0.5">Duration</label>
                          <input 
                            type="text" 
                            value={res.duration}
                            onChange={e => handleResourceChange(idx, 'duration', e.target.value)}
                            placeholder="e.g. 10 min read"
                            className="w-full p-1.5 bg-bg border border-border rounded-lg text-fg text-[11px] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-linear-to-r from-blue to-purple text-bg font-bold rounded-xl text-xs hover:-translate-y-0.5 shadow-blue-glow transition-all cursor-pointer uppercase font-black"
              >
                {editingId ? 'Update Roadmap Task' : 'Create Roadmap Task'}
              </button>
            </form>
          </div>
        </section>

        {/* RIGHT COLUMN: Tasks List */}
        <section className="flex flex-col gap-4">
          <div className="glass-panel rounded-2xl p-5 border border-border-light flex flex-col gap-4">
            <h3 className="text-xs font-bold text-blue uppercase tracking-wider">
              Roadmap Tasks ({tasks.length})
            </h3>

            {tasks.length === 0 ? (
              <div className="text-center py-12 text-fg-dark text-xs bg-surface/30 border border-border rounded-xl">
                No tasks available in the database.
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[85vh] overflow-y-auto pr-1">
                {tasks.map((t) => (
                  <div key={t._id} className="p-4 bg-fg/4 border border-border rounded-xl flex items-start justify-between gap-4 hover:border-border-light transition-all">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="bg-blue/15 text-blue text-[10px] font-black px-2 py-0.5 rounded-md">
                          Day {t.day}
                        </span>
                        <span className="bg-purple/15 text-purple text-[10px] font-black px-2 py-0.5 rounded-md">
                          {t.difficulty_level || 'Medium'}
                        </span>
                        {t.track && (
                          <span className="bg-cyan/15 text-cyan text-[10px] font-black px-2 py-0.5 rounded-md">
                            {t.track}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-fg mb-1 leading-snug">{t.task}</h4>
                      <p className="text-[10px] text-fg-dark line-clamp-2 leading-relaxed mb-2">{t.description}</p>
                      
                      {/* Counts / quick indicators */}
                      <div className="flex gap-3 text-[9px] text-fg-dark">
                        <span>📋 {t.requirements?.length || 0} Requirements</span>
                        <span>🎯 {t.acceptanceCriteria?.length || 0} Acceptance</span>
                        <span>📚 {t.resources?.length || 0} Resources</span>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(t)} 
                        className="p-2 bg-surface border border-border rounded-lg text-fg hover:border-blue hover:text-blue transition-all cursor-pointer"
                        title="Edit Task"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(t._id)} 
                        className="p-2 bg-surface border border-border rounded-lg text-red/80 hover:border-red hover:text-red transition-all cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      )}

      {activeTab === 'metrics' && (
        <main className="max-w-300 mx-auto px-5 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="glass-panel rounded-2xl p-6 border border-border-light text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue/10 rounded-full blur-2xl"></div>
              <h3 className="text-xs font-bold text-fg-muted uppercase tracking-wider mb-2">Total Students</h3>
              <p className="text-3xl font-black text-blue drop-shadow-[0_0_15px_var(--blue-glow)]">{stats?.stats?.totalUsers || 0}</p>
            </div>
            <div className="glass-panel rounded-2xl p-6 border border-border-light text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple/10 rounded-full blur-2xl"></div>
              <h3 className="text-xs font-bold text-fg-muted uppercase tracking-wider mb-2">Total Submissions</h3>
              <p className="text-3xl font-black text-purple drop-shadow-[0_0_15px_var(--purple-glow)]">{stats?.stats?.totalSubmissions || 0}</p>
            </div>
            <div className="glass-panel rounded-2xl p-6 border border-border-light text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan/10 rounded-full blur-2xl"></div>
              <h3 className="text-xs font-bold text-fg-muted uppercase tracking-wider mb-2">Tasks Created</h3>
              <p className="text-3xl font-black text-cyan drop-shadow-[0_0_15px_var(--cyan-glow)]">{stats?.stats?.totalChallenges || 0}</p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-border-light">
            <h3 className="text-sm font-bold text-fg uppercase tracking-wider mb-5 flex items-center gap-2">
              🏆 Global Leaderboard Top 100
            </h3>
            
            <div className="flex flex-col gap-3">
              {stats?.leaderboard?.length === 0 ? (
                <div className="text-center text-xs text-fg-dark py-10">No students found.</div>
              ) : (
                stats?.leaderboard?.map((u, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-surface/30 border border-border/80 rounded-xl hover:bg-surface/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue to-purple flex items-center justify-center text-[10px] font-bold text-bg shadow-sm">
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-fg">{u.name}</h4>
                        <p className="text-[10px] text-fg-dark">{u.email} {u.role === 'admin' ? '(Admin)' : ''}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-orange drop-shadow-[0_0_8px_rgba(255,165,0,0.5)]">
                        {u.current_streak} <span className="text-[10px] text-fg-muted font-normal">days</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      )}

      {/* Floating success toast */}
      <div className={`toast ${message ? 'show' : ''} ${msgType}`} id="toast">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        {message}
      </div>
    </div>
  );
}
