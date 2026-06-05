/*
  App.js — Main Portfolio Component
  ===================================
  This is the heart of your portfolio.
  All sections live here: Splash, Navbar, Hero,
  About, Skills, Projects, Certificates, Contact, Footer.

  HOW TO CUSTOMISE:
  → Edit the DATA arrays below (SKILLS, PROJECTS, CERTS)
  → Edit the text inside each section
  → Change colors in index.css (:root variables)
*/

import { useEffect, useState } from 'react';
import DotField from './components/DotField';
import './App.css';

// ── YOUR DATA — Edit these! ──────────────────────────────
const SKILLS = [
  { icon: '⚛️', name: 'React.js',           level: 85 },
  { icon: '🎨', name: 'UI / UX Design',     level: 80 },
  { icon: '🟨', name: 'JavaScript (ES6+)',  level: 90 },
  { icon: '🐍', name: 'Python',             level: 70 },
  { icon: '🗄️', name: 'SQL / Databases',    level: 75 },
  { icon: '📱', name: 'Responsive CSS',     level: 88 },
];

const PROJECTS = [
  {
    emoji: '🏛️',
    bg: 'linear-gradient(135deg,#061826,#0b3a48)',
    title: 'Barangay Communal',
    desc: 'Community-focused barangay website for sharing local information and digital public services.',
    tags: ['React', 'Vercel', 'Barangay'],
    demo: 'https://barangay-communal.vercel.app/',
    code: '#',
  },
  {
    emoji: '⛅',
    bg: 'linear-gradient(135deg,#06324a,#0e6f8f)',
    title: 'Weather App',
    desc: 'Weather forecast app with a clean interface for checking current conditions and location-based updates.',
    tags: ['JavaScript', 'Weather API', 'Responsive'],
    demo: '#',
    code: 'https://github.com/Oziew/Weather-App.git',
  },
  {
    emoji: '🧾',
    bg: 'linear-gradient(135deg,#221238,#5b2c83)',
    title: 'POS with Inventory and Credit System',
    desc: 'Point-of-sale system with inventory tracking and credit management for daily business operations.',
    tags: ['POS', 'Inventory', 'Credit System'],
    demo: '#',
    code: 'https://github.com/Triest1/POS-with-Inventory-and-Credit-System.git',
  },
];

const CERTS = [
  { badge: '🏅', title: 'Responsive Web Design',                  issuer: 'freeCodeCamp',          date: 'Mar 2024' },
  { badge: '🎓', title: 'JavaScript Algorithms & Data Structures', issuer: 'freeCodeCamp',          date: 'Jun 2024' },
  { badge: '🛰️', title: 'OrbitImages Component Integration',       issuer: 'React Bits',            date: 'Jun 2026' },
  { badge: '🤖', title: 'Machine Learning Specialisation',         issuer: 'Coursera / DeepLearning.AI', date: 'Nov 2024' },
];

// ── Main App ─────────────────────────────────────────────
export default function App() {
  // Controls whether the splash screen is showing
  const [splashHidden, setSplashHidden] = useState(false);
  // Controls mobile nav open/close
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const certificateFiles = [
    '/certificates/ceertt2.pdf',
    '/certificates/cert.pdf',
    '/certificates/certofocate.pdf',
  ];

  // ── 1. Splash screen: hide after 3 seconds ──────────────
  useEffect(() => {
    const t = setTimeout(() => setSplashHidden(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!activeCert) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveCert(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCert]);

  // ── 2. Fade-up on scroll (IntersectionObserver) ─────────
  /*
    We watch every .fade-up element.
    When it enters the viewport, we add .visible
    which triggers the CSS fade + slide animation.
  */
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [splashHidden]); // re-run after splash hides so new elements are found

  // ── 3. Skill bar animation (width fills on scroll) ──────
  useEffect(() => {
    const bars = document.querySelectorAll('[data-level]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.level + '%';
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.3 }
    );
    bars.forEach(b => obs.observe(b));
    return () => obs.disconnect();
  }, [splashHidden]);

  // ── 4. Contact form submit ───────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    alert('Message sent! Thanks for reaching out 🚀');
    e.target.reset();
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════
          SPLASH SCREEN
          Shows for 3 seconds with a loading bar,
          then fades out smoothly.
      ══════════════════════════════════════════════════ */}
      <div className={`splash ${splashHidden ? 'hidden' : ''}`}>
        <div className="splash-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="splash-panel">
          <p className="splash-kicker">Launching portfolio</p>
          <p className="splash-logo splash-logo-a2a" aria-label="A2A">
            <span aria-hidden="true">A</span>
            <span aria-hidden="true">2</span>
            <span aria-hidden="true">A</span>
          </p>
          <div className="splash-bar">
            <div className="splash-bar-fill" />
          </div>
          <div className="splash-meta">
            <span>React</span>
            <span>Motion</span>
            <span>UI</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          NAVIGATION BAR
          Fixed at the top. Blurs the background behind it.
          On mobile, shows a hamburger menu.
      ══════════════════════════════════════════════════ */}
      <nav className="nav">
        <a href="#hero" className="nav-logo">Arwin<span>.</span></a>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certificates">Certificates</a></li>
          <li><a href="#contact" className="nav-cta">Contact</a></li>
        </ul>

        {/* Mobile hamburger button */}
        <button className="hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {['about','skills','projects','certificates','contact'].map(s => (
          <a key={s} href={`#${s}`} onClick={() => setMobileOpen(false)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════
          HERO SECTION
          The DotField canvas fills the background.
          Your name and role text sits on top.
          Move your mouse to interact with the dots!
      ══════════════════════════════════════════════════ */}
      <section id="hero" className="hero">
        {/* Interactive dot background */}
        <div className="hero-bg">
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={70}
            glowRadius={180}
            sparkle={false}
            waveAmplitude={0}
            gradientFrom="rgba(168, 85, 247, 0.4)"
            gradientTo="rgba(120, 80, 200, 0.2)"
            glowColor="#0a0a0f"
          />
        </div>

        {/* Gradient fade at the bottom blends dots into page */}
        <div className="hero-aura" />
        <div className="hero-fade" />

        {/* Hero text content */}
        <div className="hero-content">
          <p className="hero-eyebrow">Welcome to my portfolio</p>

          <h1 className="hero-name">
            Hi, I'm<br />
            <span className="accent">Arwin Avenido</span>
          </h1>

          <p className="hero-role">
            <strong>Full-Stack Developer</strong> &amp; UI Designer<br />
            crafting clean digital experiences
          </p>

          <div className="hero-status">
            <span>Available for projects</span>
            <span>Davao City, Philippines</span>
            <span>Frontend + backend</span>
          </div>

          <div className="hero-btns">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact"  className="btn-outline">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT SECTION
          A two-column layout: photo on the left,
          text + stats on the right.
      ══════════════════════════════════════════════════ */}
      <section id="about" className="about section">
        <div className="container">
          <div className="about-grid">
            {/* Profile picture placeholder (replace with <img>) */}
            <div className="about-img-wrap fade-up">
              <div className="about-avatar">
                <img src="/images/about-photo.jpg" alt="Arwin Avenido graduation portrait" />
              </div>
              <span className="about-photo-accent" aria-hidden="true">A2A</span>
            </div>

            {/* Bio text */}
            <div className="about-text fade-up" style={{ transitionDelay: '0.15s' }}>
              <span className="section-label">About Me</span>
              <h2 className="section-title">Building things<br />that matter</h2>

              <p>
                I'm a passionate Full-Stack Developer based in Davao City, Philippines.
                I love turning complex problems into simple, beautiful, and intuitive
                digital products that people enjoy using.
              </p>
              <p>
                With a background in computer science and a keen eye for design,
                I bridge the gap between great engineering and great user experience.
                When I'm not coding, you'll find me exploring design trends or taking photos.
              </p>

              {/* Quick stats */}
              <div className="about-stats">
                <div className="stat-item">
                  <strong>2+</strong><span>Years coding</span>
                </div>
                <div className="stat-item">
                  <strong>3</strong><span>Projects built</span>
                </div>
                <div className="stat-item">
                  <strong>3</strong><span>Certificates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SKILLS SECTION
          Cards with animated progress bars.
          Each bar fills up when scrolled into view.
      ══════════════════════════════════════════════════ */}
      <section id="skills" className="skills section">
        <div className="container">
          <span className="section-label fade-up">What I know</span>
          <h2 className="section-title fade-up">My Skills</h2>

          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-card fade-up"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.name}</h3>
                <div className="skill-bar">
                  {/* data-level is read by IntersectionObserver in useEffect */}
                  <div className="skill-bar-fill" data-level={skill.level} />
                </div>
                <p className="skill-level">{skill.level}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROJECTS SECTION
          Cards with thumbnail, tags, and links.
          Replace demo/code href values with real URLs.
      ══════════════════════════════════════════════════ */}
      <section id="projects" className="projects section">
        <div className="container">
          <span className="section-label fade-up">What I've built</span>
          <h2 className="section-title fade-up">Projects</h2>

          <div className="projects-grid">
            {PROJECTS.map((p, i) => {
              const projectUrl = p.demo !== '#' ? p.demo : p.code !== '#' ? p.code : null;

              return (
                <div
                  key={p.title}
                  className={`project-card fade-up ${projectUrl ? 'project-card-link' : ''}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  role={projectUrl ? 'link' : undefined}
                  tabIndex={projectUrl ? 0 : undefined}
                  onClick={() => {
                    if (projectUrl) window.open(projectUrl, '_blank', 'noopener,noreferrer');
                  }}
                  onKeyDown={(e) => {
                    if (projectUrl && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      window.open(projectUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <div className="project-thumb" style={{ background: p.bg }}>
                    {p.emoji}
                  </div>
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="project-tags">
                      {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div className="project-links">
                      {p.demo !== '#' && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          ↗ Live Demo
                        </a>
                      )}
                      {p.code !== '#' && (
                        <a
                          href={p.code}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          ⌥ Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CERTIFICATES SECTION
          Cards showing your credentials.
          Add or remove items in the CERTS array above.
      ══════════════════════════════════════════════════ */}
      <section id="certificates" className="certificates section">
        <div className="container">
          <span className="section-label fade-up">Credentials</span>
          <h2 className="section-title fade-up">Certificates</h2>

          <div className="certs-grid certs-gallery">
            {CERTS.slice(0, 3).map((c, i) => {
              const cert = { ...c, file: certificateFiles[i] };

              return (
                <button
                  key={c.title}
                  type="button"
                  className="cert-card cert-image-card fade-up"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  onClick={() => setActiveCert(cert)}
                  aria-label={`Open ${c.title} certificate`}
                >
                  <span className="cert-picture">
                    <iframe
                      src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
                      title={`${c.title} certificate preview`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT SECTION
          Left: contact details. Right: message form.
          Update the email, phone, and social links below.
      ══════════════════════════════════════════════════ */}
      <section id="contact" className="contact section">
        <div className="container">
          <span className="section-label fade-up">Let's talk</span>
          <h2 className="section-title fade-up">Contact Me</h2>

          <div className="contact-wrap contact-wrap-simple">
            {/* Left column */}
            <div className="contact-info fade-up">
              <h3>Have a project in mind?</h3>
              <p>
                I'm open to projects, collaborations, and creative tech work.
                Reach me directly through any of the links below.
              </p>

              <div className="contact-links">
                <a href="mailto:Arwinavenido19@gmail.com" className="contact-item">
                  <div className="contact-icon">📧</div>
                  <span>
                    <small>Email</small>
                    Arwinavenido19@gmail.com
                  </span>
                </a>
                <a href="tel:09939195851" className="contact-item">
                  <div className="contact-icon">📞</div>
                  <span>
                    <small>Phone</small>
                    09939195851
                  </span>
                </a>
                <a href="https://github.com/Oziew" target="_blank" rel="noreferrer" className="contact-item">
                  <div className="contact-icon">🐙</div>
                  <span>
                    <small>GitHub</small>
                    github.com/Oziew
                  </span>
                </a>
                <a href="https://instagram.com/Imnot_W1nny" target="_blank" rel="noreferrer" className="contact-item">
                  <div className="contact-icon">💼</div>
                  <span>
                    <small>Instagram</small>
                    @Imnot_W1nny
                  </span>
                </a>
              </div>
            </div>

            {/* Right column: form */}
            <div className="contact-form fade-up" style={{ transitionDelay: '0.15s' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Juan dela Cruz" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="juan@example.com" required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Project Inquiry" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows={5} placeholder="Tell me about your project..." required />
                </div>
                <button type="submit" className="form-submit">
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      {activeCert && (
        <div
          className="cert-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCert.title} certificate preview`}
          onClick={() => setActiveCert(null)}
        >
          <div className="cert-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cert-lightbox-close"
              onClick={() => setActiveCert(null)}
              aria-label="Close certificate preview"
            >
              x
            </button>
            <iframe
              src={activeCert.file}
              title={`${activeCert.title} certificate enlarged`}
            />
          </div>
        </div>
      )}

      <footer className="footer">
        <p>
          Designed &amp; built by <span>Arwin Avenido</span> — {new Date().getFullYear()} · All rights reserved
        </p>
      </footer>
    </>
  );
}
