import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/overview', label: 'Overview', icon: '▦' },
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '♛' },
  { to: '/teams', label: 'Teams', icon: '◎' },
  { to: '/users', label: 'Members', icon: '◌' },
  { to: '/workouts', label: 'Workouts', icon: '✦' },
]

function Overview() {
  return (
    <section className="overview-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT / COMMAND CENTER</p>
          <h1>Build momentum.</h1>
          <p className="heading-copy">A clear view of the people, movement and goals powering your team.</p>
        </div>
        <div className="date-chip">SEPTEMBER 2026 <span>•</span> LIVE</div>
      </div>
      <div className="metric-grid">
        <NavLink className="metric-card metric-card-lime" to="/activities">
          <span className="metric-label">Activity feed</span><strong>03</strong><span className="metric-note">sessions logged this week ↗</span>
        </NavLink>
        <NavLink className="metric-card metric-card-ink" to="/leaderboard">
          <span className="metric-label">Top score</span><strong>1,240</strong><span className="metric-note">points leading the pack ↗</span>
        </NavLink>
        <NavLink className="metric-card metric-card-coral" to="/teams">
          <span className="metric-label">Active teams</span><strong>02</strong><span className="metric-note">groups in motion ↗</span>
        </NavLink>
      </div>
      <div className="overview-grid">
        <div className="feature-panel">
          <div className="panel-kicker">THIS WEEK</div>
          <h2>Small actions.<br /><em>Visible progress.</em></h2>
          <p>Log a session, cheer a teammate, and keep the streak moving forward.</p>
          <NavLink className="button button-light" to="/workouts">Find a workout <span>→</span></NavLink>
        </div>
        <div className="quick-panel">
          <div className="panel-header"><span className="panel-kicker">QUICK ACCESS</span><span className="pulse-dot" /></div>
          {navigation.slice(1, 4).map((item) => (
            <NavLink className="quick-link" to={item.to} key={item.to}>
              <span className="quick-icon">{item.icon}</span><span>{item.label}</span><span className="quick-arrow">↗</span>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/overview"><img src="/octofitapp-small.png" alt="" /><span>octofit<span>.</span></span></NavLink>
        <div className="sidebar-rule" />
        <p className="sidebar-label">Workspace</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={item.to} key={item.to}>
              <span className="nav-icon">{item.icon}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" /> API connected <small>:8000</small></div>
      </aside>
      <main className="content-area">
        <header className="topbar"><span className="topbar-title">OctoFit Tracker</span><span className="topbar-status">TEAM HEALTH <span className="status-dot" /></span></header>
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
