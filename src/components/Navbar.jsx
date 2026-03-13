import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-omb">OMB</span>
          <span className="logo-hedge">Hedge</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/calculator" className={`nav-link ${pathname === '/calculator' ? 'active' : ''}`}>Calculator</Link>
          <Link to="/docs" className={`nav-link ${pathname === '/docs' ? 'active' : ''}`}>Docs</Link>
        </div>
      </div>
    </nav>
  )
}
