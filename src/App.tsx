import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, BookOpen, Users, Home as HomeIcon, 
  Settings, LogOut, ChevronRight, Brain, 
  ExternalLink, Plus, Trash2, Save, Edit3
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Research", path: "/#research", icon: Brain },
    { name: "Publications", path: "/publications", icon: BookOpen },
    { name: "Team", path: "/team", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="font-sans font-bold text-xl tracking-tight text-slate-900">Benninger Lab</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-indigo-600",
                  location.pathname === link.path ? "text-indigo-600" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="text-sm font-medium text-indigo-600 flex items-center">
                  <Settings className="w-4 h-4 mr-1" /> Admin
                </Link>
                <button onClick={onLogout} className="text-sm font-medium text-slate-600 hover:text-red-600">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-indigo-600 hover:bg-slate-50 rounded-md"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => { onLogout(); setIsOpen(false); }}
                    className="w-full text-left block px-3 py-2 text-base font-medium text-red-600 hover:bg-slate-50 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const Home = ({ content }: { content: any }) => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://picsum.photos/seed/neuro/1920/1080?blur=2" 
            alt="Hero background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight mb-6"
          >
            {content.hero_title || "Benninger Neurology Lab"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-200 font-light mb-10"
          >
            {content.hero_subtitle || "Advancing Neurological Care through Innovative Research"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/publications" 
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
            >
              View Our Publications <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-sans font-bold text-slate-900 mb-6">About the Lab</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {content.about_text}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 rounded-2xl border border-black/5">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">100+</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Publications</div>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-black/5">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">RMC</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Rabin Medical Center</div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/lab/800/600" 
                alt="Lab environment" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-sans font-bold text-slate-900 mb-6">Research Focus</h2>
            <p className="text-lg text-slate-600">
              {content.research_focus}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Epilepsy", desc: "Investigating seizure mechanisms and developing novel therapeutic approaches.", icon: Brain },
              { title: "Neurophysiology", desc: "Utilizing EEG and advanced signal processing to understand brain function.", icon: Brain },
              { title: "Clinical Neurology", desc: "Translating research findings into clinical practice for better patient outcomes.", icon: Users },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Publications = ({ papers }: { papers: any[] }) => {
  const [filter, setFilter] = useState("All");
  const researchers = ["All", "Felix Benninger", "Oded Shor", "Shelly Degani Schwalm", "Nir Cafri"];

  const filteredPapers = filter === "All" 
    ? papers 
    : papers.filter(p => p.researcher_name === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-sans font-bold text-slate-900 mb-4">Publications</h1>
            <p className="text-slate-600 max-w-2xl">
              A comprehensive list of research papers and clinical studies from our lab members.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {researchers.map(r => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  filter === r 
                    ? "bg-indigo-600 text-white" 
                    : "bg-white text-slate-600 border border-black/5 hover:bg-slate-50"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredPapers.map((paper, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={paper.id}
              className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                    {paper.journal} • {paper.year}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 italic">
                    {paper.authors}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-500 rounded">
                      Lead: {paper.researcher_name}
                    </span>
                    {paper.link && (
                      <a 
                        href={paper.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 text-sm font-medium flex items-center hover:underline"
                      >
                        View Paper <ExternalLink className="ml-1 w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredPapers.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No publications found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const team = [
    { name: "Felix Benninger", role: "Lab Director", email: "felixbenninger@gmail.com", bio: "Expert in clinical neurology and epilepsy research at Rabin Medical Center." },
    { name: "Oded Shor", role: "Senior Researcher", email: "shor.oded@gmail.com", bio: "Focused on neurophysiological mechanisms and epilepsy." },
    { name: "Shelly Degani Schwalm", role: "Researcher", email: "shellydegani@gmail.com", bio: "Specializing in clinical studies and patient outcomes in neurology." },
    { name: "Nir Cafri", role: "Researcher", email: "", bio: "Contributing to the lab's ongoing research in neurological disorders." },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-sans font-bold text-slate-900 mb-4">Our Team</h1>
          <p className="text-slate-600">
            Meet the dedicated researchers working to advance neurological science at Rabin Medical Center.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              <div className="aspect-square rounded-3xl overflow-hidden mb-6 bg-slate-100 relative">
                <img 
                  src={`https://picsum.photos/seed/${member.name}/400/400`} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
              <div className="text-sm font-medium text-indigo-600 mb-3">{member.role}</div>
              <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
              {member.email && (
                <a href={`mailto:${member.email}`} className="text-xs text-slate-400 hover:text-indigo-600 transition-colors">
                  {member.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminLogin = ({ onLogin }: { onLogin: (u: any) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success) {
      onLogin(data.user);
      navigate("/admin");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-black/5">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
            <Settings className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Access</h2>
          <p className="text-slate-500">Sign in to manage lab content</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ papers, content, onUpdatePapers, onUpdateContent }: any) => {
  const [activeTab, setActiveTab] = useState("papers");
  const [newPaper, setNewPaper] = useState({ title: "", authors: "", journal: "", year: new Date().getFullYear(), link: "", researcher_name: "Felix Benninger" });
  const [editingContent, setEditingContent] = useState<any>({});

  useEffect(() => {
    setEditingContent(content);
  }, [content]);

  const handleAddPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/papers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPaper),
    });
    if (res.ok) {
      onUpdatePapers();
      setNewPaper({ title: "", authors: "", journal: "", year: new Date().getFullYear(), link: "", researcher_name: "Felix Benninger" });
    }
  };

  const handleDeletePaper = async (id: number) => {
    if (confirm("Are you sure you want to delete this paper?")) {
      await fetch(`/api/papers/${id}`, { method: "DELETE" });
      onUpdatePapers();
    }
  };

  const handleSaveContent = async (key: string) => {
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: editingContent[key] }),
    });
    onUpdateContent();
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-sans font-bold text-slate-900">Admin Dashboard</h1>
          <div className="flex bg-white p-1 rounded-xl border border-black/5 shadow-sm">
            <button
              onClick={() => setActiveTab("papers")}
              className={cn("px-6 py-2 rounded-lg text-sm font-medium transition-all", activeTab === "papers" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-50")}
            >
              Papers
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={cn("px-6 py-2 rounded-lg text-sm font-medium transition-all", activeTab === "content" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-50")}
            >
              Site Content
            </button>
          </div>
        </div>

        {activeTab === "papers" ? (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 sticky top-32">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <Plus className="mr-2 w-5 h-5 text-indigo-600" /> Add New Paper
                </h2>
                <form onSubmit={handleAddPaper} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={newPaper.title}
                      onChange={(e) => setNewPaper({ ...newPaper, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Authors</label>
                    <input
                      type="text"
                      value={newPaper.authors}
                      onChange={(e) => setNewPaper({ ...newPaper, authors: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Journal</label>
                      <input
                        type="text"
                        value={newPaper.journal}
                        onChange={(e) => setNewPaper({ ...newPaper, journal: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Year</label>
                      <input
                        type="number"
                        value={newPaper.year}
                        onChange={(e) => setNewPaper({ ...newPaper, year: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Researcher</label>
                    <select
                      value={newPaper.researcher_name}
                      onChange={(e) => setNewPaper({ ...newPaper, researcher_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    >
                      {["Felix Benninger", "Oded Shor", "Shelly Degani Schwalm", "Nir Cafri"].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Link (Optional)</label>
                    <input
                      type="url"
                      value={newPaper.link}
                      onChange={(e) => setNewPaper({ ...newPaper, link: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                  >
                    Add Paper
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {papers.map((paper: any) => (
                <div key={paper.id} className="p-6 bg-white rounded-2xl border border-black/5 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900">{paper.title}</h4>
                    <p className="text-sm text-slate-500">{paper.researcher_name} • {paper.year}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePaper(paper.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {Object.keys(editingContent).map((key) => (
              <div key={key} className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{key.replace("_", " ")}</label>
                  <button
                    onClick={() => handleSaveContent(key)}
                    className="flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </button>
                </div>
                <textarea
                  value={editingContent[key]}
                  onChange={(e) => setEditingContent({ ...editingContent, [key]: e.target.value })}
                  rows={4}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [papers, setPapers] = useState<any[]>([]);
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Check health first
      const healthRes = await fetch("/api/health").catch(() => null);
      if (!healthRes || !healthRes.ok) {
        throw new Error("Backend server is unreachable. Please check your deployment.");
      }

      const [papersRes, contentRes, userRes] = await Promise.all([
        fetch("/api/papers"),
        fetch("/api/content"),
        fetch("/api/me")
      ]);

      if (!papersRes.ok || !contentRes.ok || !userRes.ok) {
        throw new Error("Failed to fetch initial data from server.");
      }

      const [papersData, contentData, userData] = await Promise.all([
        papersRes.json(),
        contentRes.json(),
        userRes.json()
      ]);
      
      if (papersData.length === 0) {
        // Auto-seed if no papers
        try {
          const seedRes = await fetch("/api/seed");
          const seedData = await seedRes.json();
          if (seedData.success) {
            const newPapersRes = await fetch("/api/papers");
            const newPapersData = await newPapersRes.json();
            setPapers(newPapersData);
          }
        } catch (seedErr) {
          console.error("Seeding failed:", seedErr);
          // Don't block the app if seeding fails, just show empty
          setPapers([]);
        }
      } else {
        setPapers(papersData);
      }
      
      setContent(contentData);
      setUser(userData.user);
    } catch (err: any) {
      console.error("Initialization error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Brain className="w-12 h-12 text-indigo-600" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
          <X className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Connection Error</h2>
        <p className="text-slate-600 mb-8 max-w-md">
          {error}
          <br />
          <span className="text-sm mt-2 block">
            If you are on Vercel, ensure your environment variables are set and the backend is running.
          </span>
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar user={user} onLogout={handleLogout} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home content={content} />} />
            <Route path="/publications" element={<Publications papers={papers} />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<AdminLogin onLogin={setUser} />} />
            <Route 
              path="/admin" 
              element={
                user ? (
                  <AdminDashboard 
                    papers={papers} 
                    content={content} 
                    onUpdatePapers={fetchData} 
                    onUpdateContent={fetchData} 
                  />
                ) : (
                  <AdminLogin onLogin={setUser} />
                )
              } 
            />
          </Routes>
        </AnimatePresence>

        <footer className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Brain className="w-8 h-8 text-indigo-400" />
                  <span className="font-sans font-bold text-xl tracking-tight">Benninger Lab</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Dedicated to advancing the field of neurology through rigorous research and compassionate patient care at Rabin Medical Center.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/publications" className="text-slate-400 hover:text-white transition-colors">Publications</Link></li>
                  <li><Link to="/team" className="text-slate-400 hover:text-white transition-colors">Team</Link></li>
                  <li><Link to="/login" className="text-slate-400 hover:text-white transition-colors">Admin Login</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Contact</h4>
                <p className="text-slate-400 mb-2">Rabin Medical Center</p>
                <p className="text-slate-400 mb-2">Petah Tikva, Israel</p>
                <p className="text-slate-400">felixbenninger@gmail.com</p>
              </div>
            </div>
            <div className="pt-12 border-t border-white/10 text-center text-slate-500 text-sm">
              © {new Date().getFullYear()} Felix Benninger Lab. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
