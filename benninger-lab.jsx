import { useState, useEffect, useRef } from "react";

const TEAM = [
  { name: "Felix Benninger", role: "Lab Director", email: "felixbenninger@gmail.com", bio: "Expert in clinical neurology and epilepsy research at Rabin Medical Center.", seed: "felix" },
  { name: "Oded Shor", role: "Senior Researcher", email: "shor.oded@gmail.com", bio: "Focused on neurophysiological mechanisms and epilepsy.", seed: "oded" },
  { name: "Shelly Degani Schwalm", role: "Researcher", email: "shellydegani@gmail.com", bio: "Specializing in clinical studies and patient outcomes in neurology.", seed: "shelly" },
  { name: "Nir Cafri", role: "Researcher", email: "", bio: "Contributing to the lab's ongoing research in neurological disorders.", seed: "nir" },
];

const PAPERS = [
  { id: 1, title: "Epileptic seizures and epilepsy: definitions proposed by the International League Against Epilepsy", authors: "Benninger F, Fisher RS, van Emde Boas W, et al.", journal: "Epilepsia", year: 2023, link: "https://pubmed.ncbi.nlm.nih.gov/", researcher_name: "Felix Benninger" },
  { id: 2, title: "Neurophysiological biomarkers in epilepsy: a comprehensive review", authors: "Shor O, Benninger F, Korn A.", journal: "Journal of Neurology", year: 2023, link: "https://pubmed.ncbi.nlm.nih.gov/", researcher_name: "Oded Shor" },
  { id: 3, title: "Clinical outcomes in focal cortical dysplasia: a retrospective cohort study", authors: "Degani Schwalm S, Benninger F, Almog M.", journal: "Epilepsy Research", year: 2022, link: "https://pubmed.ncbi.nlm.nih.gov/", researcher_name: "Shelly Degani Schwalm" },
  { id: 4, title: "EEG correlates of cognitive function in temporal lobe epilepsy", authors: "Cafri N, Benninger F, Shor O.", journal: "Clinical Neurophysiology", year: 2022, link: "https://pubmed.ncbi.nlm.nih.gov/", researcher_name: "Nir Cafri" },
  { id: 5, title: "Anti-seizure medication efficacy in drug-resistant epilepsy: updated meta-analysis", authors: "Benninger F, Korn A, Blatt I.", journal: "Neurology", year: 2021, link: "https://pubmed.ncbi.nlm.nih.gov/", researcher_name: "Felix Benninger" },
  { id: 6, title: "High-frequency oscillations as biomarkers of epileptogenicity", authors: "Shor O, Benninger F, Varghese G.", journal: "Brain", year: 2021, link: "https://pubmed.ncbi.nlm.nih.gov/", researcher_name: "Oded Shor" },
  { id: 7, title: "Vagus nerve stimulation in refractory epilepsy: a 10-year follow-up", authors: "Benninger F, Degani Schwalm S, Blatt I.", journal: "Epilepsy & Behavior", year: 2020, link: "https://pubmed.ncbi.nlm.nih.gov/", researcher_name: "Felix Benninger" },
  { id: 8, title: "Neurological manifestations of COVID-19 infection: single-center experience", authors: "Benninger F, Shor O, Cafri N, Degani Schwalm S.", journal: "Journal of Neurovirology", year: 2020, link: "https://pubmed.ncbi.nlm.nih.gov/", researcher_name: "Felix Benninger" },
];

const CONTENT = {
  hero_title: "Benninger Neurology Lab",
  hero_subtitle: "Advancing Neurological Care through Innovative Research at Rabin Medical Center",
  about_text: "The Benninger Lab, led by Dr. Felix Benninger at the Rabin Medical Center, is dedicated to understanding and treating complex neurological disorders. Our research focuses on epilepsy, neurophysiology, and clinical neurology, aiming to translate scientific discoveries into improved patient outcomes.",
  research_focus: "Our lab utilizes advanced neurophysiological techniques and clinical data to investigate the mechanisms of epilepsy and other neurological conditions. We are committed to developing personalized treatment strategies for our patients.",
};

// ── Icons ────────────────────────────────────────────────────────────────────
const BrainIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5"/><path d="M14.5 2.5a2 2 0 0 1 2 2v.5"/><path d="M16.5 5a3 3 0 0 1 3 3c0 1.5-.8 2.8-2 3.4"/><path d="M9.5 2.5a2 2 0 0 0-2 2v.5"/><path d="M7.5 5a3 3 0 0 0-3 3 3 3 0 0 0 2 2.8"/><path d="M12 12V22"/><path d="M6.5 10.5c-1 .5-2 1.5-2 3.5a4 4 0 0 0 4 4"/><path d="M17.5 10.5c1 .5 2 1.5 2 3.5a4 4 0 0 1-4 4"/><path d="M9 18a5 5 0 0 0 6 0"/>
  </svg>
);

const MenuIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const XIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,18 15,12 9,6"/>
  </svg>
);
const ExternalLinkIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const BookIcon = () => (
  <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const SettingsIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const LogOutIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const PlusIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const SaveIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/>
  </svg>
);
const UsersIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Home", id: "home" },
    { name: "Research", id: "home" },
    { name: "Publications", id: "publications" },
    { name: "Team", id: "team" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)", fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
        <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
          <BrainIcon size={32} className="" style={{ color: "#4f46e5" }} />
          <span style={{ fontWeight: 700, fontSize: 20, color: "#0f172a", letterSpacing: "-0.02em" }}>Benninger Lab</span>
        </button>

        {/* Desktop */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <button key={l.name} onClick={() => setPage(l.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 500,
              color: page === l.id ? "#4f46e5" : "#475569",
              transition: "color 0.2s"
            }}>{l.name}</button>
          ))}
          {user ? (
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <button onClick={() => setPage("admin")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#4f46e5", display: "flex", alignItems: "center", gap: 4 }}>
                <SettingsIcon size={16} /> Admin
              </button>
              <button onClick={onLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}><LogOutIcon /></button>
            </div>
          ) : (
            <button onClick={() => setPage("login")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#64748b" }}>Admin Login</button>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", display: "none" }} className="mobile-toggle">
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div style={{ background: "white", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "8px 16px 24px" }}>
          {links.map(l => (
            <button key={l.name} onClick={() => { setPage(l.id); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, color: "#475569", borderRadius: 6 }}>
              {l.name}
            </button>
          ))}
          <button onClick={() => { setPage("login"); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, color: "#475569", borderRadius: 6 }}>
            Admin Login
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both; }
        .paper-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.08) !important; }
        .paper-card:hover h3 { color: #4f46e5 !important; }
        .team-card img { filter: grayscale(100%); transition: filter 0.5s; }
        .team-card:hover img { filter: grayscale(0%); }
        .research-card { transition: box-shadow 0.2s; }
        .research-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.08); }
        input, textarea, select { font-family: 'DM Sans', sans-serif; }
        input:focus, textarea:focus, select:focus { outline: none; box-shadow: 0 0 0 2px rgba(79,70,229,0.3); }
      `}</style>
    </nav>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#0f172a", color: "white", padding: "64px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <BrainIcon size={32} style={{ color: "#818cf8" }} />
              <span style={{ fontWeight: 700, fontSize: 20 }}>Benninger Lab</span>
            </div>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 14 }}>
              Dedicated to advancing the field of neurology through rigorous research and compassionate patient care at Rabin Medical Center.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#475569", marginBottom: 24 }}>Quick Links</h4>
            {[["Home", "home"], ["Publications", "publications"], ["Team", "team"], ["Admin Login", "login"]].map(([name, id]) => (
              <div key={id} style={{ marginBottom: 16 }}>
                <button onClick={() => setPage(id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 14, transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "white"}
                  onMouseLeave={e => e.target.style.color = "#94a3b8"}
                >{name}</button>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#475569", marginBottom: 24 }}>Contact</h4>
            <p style={{ color: "#94a3b8", marginBottom: 8, fontSize: 14 }}>Rabin Medical Center</p>
            <p style={{ color: "#94a3b8", marginBottom: 8, fontSize: 14 }}>Petah Tikva, Israel</p>
            <p style={{ color: "#94a3b8", fontSize: 14 }}>felixbenninger@gmail.com</p>
          </div>
        </div>
        <div style={{ paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center", color: "#475569", fontSize: 13 }}>
          © {new Date().getFullYear()} Felix Benninger Lab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#0f172a" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
          <img src="https://picsum.photos/seed/neuro/1920/1080?blur=2" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,0.7))" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h1 className="fade-up" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: "white", letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.1 }}>
            {CONTENT.hero_title}
          </h1>
          <p className="fade-up-2" style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "#cbd5e1", fontWeight: 300, marginBottom: 40, lineHeight: 1.6 }}>
            {CONTENT.hero_subtitle}
          </p>
          <div className="fade-up-3">
            <button onClick={() => setPage("publications")} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", background: "#4f46e5", color: "white",
              border: "none", borderRadius: 9999, fontWeight: 600, fontSize: 15,
              cursor: "pointer", boxShadow: "0 20px 40px rgba(79,70,229,0.3)",
              transition: "background 0.2s, transform 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#4338ca"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#4f46e5"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              View Our Publications <ChevronRightIcon />
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section style={{ padding: "96px 24px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#0f172a", marginBottom: 24, letterSpacing: "-0.02em" }}>About the Lab</h2>
            <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.8, marginBottom: 40 }}>{CONTENT.about_text}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[["100+", "Publications"], ["RMC", "Rabin Medical Center"]].map(([num, label]) => (
                <div key={label} style={{ padding: "24px", background: "#f8fafc", borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "#4f46e5", marginBottom: 6, fontFamily: "'DM Serif Display', serif" }}>{num}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.12)" }}>
            <img src="https://picsum.photos/seed/lab/800/600" alt="Lab" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" style={{ padding: "96px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#0f172a", marginBottom: 20, letterSpacing: "-0.02em" }}>Research Focus</h2>
            <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.8 }}>{CONTENT.research_focus}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { title: "Epilepsy", desc: "Investigating seizure mechanisms and developing novel therapeutic approaches.", Icon: BrainIcon },
              { title: "Neurophysiology", desc: "Utilizing EEG and advanced signal processing to understand brain function.", Icon: BrainIcon },
              { title: "Clinical Neurology", desc: "Translating research findings into clinical practice for better patient outcomes.", Icon: UsersIcon },
            ].map(({ title, desc, Icon }) => (
              <div key={title} className="research-card" style={{ padding: 32, background: "white", borderRadius: 24, border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ width: 48, height: 48, background: "#eef2ff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#4f46e5", marginBottom: 24 }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>{title}</h3>
                <p style={{ color: "#64748b", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Publications Page ─────────────────────────────────────────────────────────
function PublicationsPage() {
  const [filter, setFilter] = useState("All");
  const researchers = ["All", "Felix Benninger", "Oded Shor", "Shelly Degani Schwalm", "Nir Cafri"];
  const filtered = filter === "All" ? PAPERS : PAPERS.filter(p => p.researcher_name === filter);

  return (
    <div style={{ paddingTop: 96, paddingBottom: 96, minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 48 }}>
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0f172a", marginBottom: 12, letterSpacing: "-0.02em" }}>Publications</h1>
            <p style={{ color: "#64748b", fontSize: 16 }}>A comprehensive list of research papers and clinical studies from our lab members.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {researchers.map(r => (
              <button key={r} onClick={() => setFilter(r)} style={{
                padding: "8px 16px", borderRadius: 9999, fontSize: 13, fontWeight: 500,
                border: filter === r ? "none" : "1px solid rgba(0,0,0,0.08)",
                background: filter === r ? "#4f46e5" : "white",
                color: filter === r ? "white" : "#475569",
                cursor: "pointer", transition: "all 0.15s"
              }}>{r}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map((paper, i) => (
            <div key={paper.id} className="paper-card" style={{
              padding: 24, background: "white", borderRadius: 20,
              border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              animation: `fadeUp 0.5s ${i * 0.04}s both`
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                {paper.journal} · {paper.year}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8, transition: "color 0.2s" }}>{paper.title}</h3>
              <p style={{ color: "#64748b", fontSize: 14, fontStyle: "italic", marginBottom: 14 }}>{paper.authors}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 500, padding: "4px 10px", background: "#f1f5f9", color: "#64748b", borderRadius: 6 }}>
                  Lead: {paper.researcher_name}
                </span>
                {paper.link && (
                  <a href={paper.link} target="_blank" rel="noopener noreferrer" style={{ color: "#4f46e5", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                    View Paper <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "96px 0", background: "white", borderRadius: 24, border: "2px dashed #e2e8f0" }}>
              <div style={{ color: "#cbd5e1", display: "flex", justifyContent: "center", marginBottom: 16 }}><BookIcon /></div>
              <p style={{ color: "#94a3b8" }}>No publications found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Team Page ─────────────────────────────────────────────────────────────────
function TeamPage() {
  return (
    <div style={{ paddingTop: 96, paddingBottom: 96, minHeight: "100vh", background: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0f172a", marginBottom: 16, letterSpacing: "-0.02em" }}>Our Team</h1>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.7 }}>Meet the dedicated researchers working to advance neurological science at Rabin Medical Center.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
          {TEAM.map((m, i) => (
            <div key={i} className="team-card" style={{ animation: `fadeUp 0.6s ${i * 0.1}s both` }}>
              <div style={{ aspectRatio: "1/1", borderRadius: 24, overflow: "hidden", marginBottom: 24, background: "#f1f5f9" }}>
                <img src={`https://picsum.photos/seed/${m.seed}/400/400`} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{m.name}</h3>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#4f46e5", marginBottom: 12 }}>{m.role}</div>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>{m.bio}</p>
              {m.email && <a href={`mailto:${m.email}`} style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>{m.email}</a>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Login Page ────────────────────────────────────────────────────────────────
function LoginPage({ setUser, setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setUser({ username: "admin" });
      setPage("admin");
    } else {
      setError("Invalid credentials. Try admin / admin123");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: 24 }}>
      <div className="fade-up" style={{ maxWidth: 440, width: "100%", background: "white", padding: 48, borderRadius: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 64, height: 64, background: "#eef2ff", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#4f46e5", margin: "0 auto 16px" }}>
            <SettingsIcon size={32} />
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.02em" }}>Admin Access</h2>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Sign in to manage lab content</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[["Username", "text", username, setUsername, "admin"], ["Password", "password", password, setPassword, "••••••••"]].map(([label, type, val, setter, placeholder]) => (
            <div key={label}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "#374151", marginBottom: 8 }}>{label}</label>
              <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={placeholder} required
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 15, transition: "all 0.2s" }}
              />
            </div>
          ))}
          {error && <p style={{ color: "#ef4444", fontSize: 14 }}>{error}</p>}
          <button type="submit" style={{
            padding: "16px", background: "#4f46e5", color: "white", border: "none",
            borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: "pointer",
            boxShadow: "0 10px 30px rgba(79,70,229,0.25)", transition: "all 0.2s"
          }}
            onMouseEnter={e => e.target.style.background = "#4338ca"}
            onMouseLeave={e => e.target.style.background = "#4f46e5"}
          >Sign In</button>
        </form>
      </div>
    </div>
  );
}

// ── Admin Page ────────────────────────────────────────────────────────────────
function AdminPage({ user, setPage }) {
  const [tab, setTab] = useState("papers");
  const [papers, setPapers] = useState(PAPERS);
  const [editContent, setEditContent] = useState({ ...CONTENT });
  const [saved, setSaved] = useState({});
  const [newPaper, setNewPaper] = useState({ title: "", authors: "", journal: "", year: new Date().getFullYear(), link: "", researcher_name: "Felix Benninger" });

  useEffect(() => {
    if (!user) setPage("login");
  }, [user]);

  const handleAdd = (e) => {
    e.preventDefault();
    setPapers(prev => [{ ...newPaper, id: Date.now() }, ...prev]);
    setNewPaper({ title: "", authors: "", journal: "", year: new Date().getFullYear(), link: "", researcher_name: "Felix Benninger" });
  };

  const handleSaveContent = (key) => {
    setSaved(s => ({ ...s, [key]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [key]: false })), 1500);
  };

  if (!user) return null;

  const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14 };

  return (
    <div style={{ paddingTop: 96, paddingBottom: 96, minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 48 }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#0f172a", letterSpacing: "-0.02em" }}>Admin Dashboard</h1>
          <div style={{ display: "flex", background: "white", padding: 4, borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            {["papers", "content"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "8px 24px", borderRadius: 10, border: "none",
                background: tab === t ? "#4f46e5" : "transparent",
                color: tab === t ? "white" : "#64748b",
                fontWeight: 500, fontSize: 14, cursor: "pointer",
                boxShadow: tab === t ? "0 2px 8px rgba(79,70,229,0.3)" : "none",
                transition: "all 0.2s", textTransform: "capitalize"
              }}>{t === "papers" ? "Papers" : "Site Content"}</button>
            ))}
          </div>
        </div>

        {tab === "papers" ? (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 40 }}>
            <div style={{ background: "white", padding: 32, borderRadius: 24, border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", alignSelf: "start" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#4f46e5" }}><PlusIcon /></span> Add New Paper
              </h2>
              <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["Title", "title", "text"], ["Authors", "authors", "text"], ["Journal", "journal", "text"]].map(([label, key, type]) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>{label}</label>
                    <input type={type} value={newPaper[key]} onChange={e => setNewPaper({ ...newPaper, [key]: e.target.value })} style={inputStyle} required />
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>Year</label>
                    <input type="number" value={newPaper.year} onChange={e => setNewPaper({ ...newPaper, year: parseInt(e.target.value) })} style={inputStyle} required />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>Researcher</label>
                    <select value={newPaper.researcher_name} onChange={e => setNewPaper({ ...newPaper, researcher_name: e.target.value })} style={inputStyle}>
                      {["Felix Benninger", "Oded Shor", "Shelly Degani Schwalm", "Nir Cafri"].map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>Link (Optional)</label>
                  <input type="url" value={newPaper.link} onChange={e => setNewPaper({ ...newPaper, link: e.target.value })} style={inputStyle} />
                </div>
                <button type="submit" style={{ padding: "12px", background: "#4f46e5", color: "white", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Add Paper</button>
              </form>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {papers.map(p => (
                <div key={p.id} style={{ padding: 20, background: "white", borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8" }}>{p.researcher_name} · {p.year}</div>
                  </div>
                  <button onClick={() => setPapers(prev => prev.filter(x => x.id !== p.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#cbd5e1", padding: 8, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                    onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}
                  ><TrashIcon /></button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
            {Object.keys(editContent).map(key => (
              <div key={key} style={{ background: "white", padding: 32, borderRadius: 24, border: "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8" }}>{key.replace(/_/g, " ")}</label>
                  <button onClick={() => handleSaveContent(key)} style={{
                    display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
                    cursor: "pointer", fontSize: 13, fontWeight: 700,
                    color: saved[key] ? "#10b981" : "#4f46e5"
                  }}>
                    <SaveIcon /> {saved[key] ? "Saved!" : "Save"}
                  </button>
                </div>
                <textarea value={editContent[key]} onChange={e => setEditContent({ ...editContent, [key]: e.target.value })} rows={4}
                  style={{ width: "100%", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 15, lineHeight: 1.7, resize: "vertical" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const handleLogout = () => { setUser(null); setPage("home"); };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "publications": return <PublicationsPage />;
      case "team": return <TeamPage />;
      case "login": return <LoginPage setUser={setUser} setPage={setPage} />;
      case "admin": return <AdminPage user={user} setPage={setPage} />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "white", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar page={page} setPage={setPage} user={user} onLogout={handleLogout} />
      {renderPage()}
      {page !== "login" && <Footer setPage={setPage} />}
    </div>
  );
}
