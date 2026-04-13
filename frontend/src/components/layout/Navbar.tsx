import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🍎</span>
          <span className="logo-text">Reseller Apple</span>
        </Link>
        
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Produkty</Link></li>
          <li><Link to="/about">O nas</Link></li>
          <li><Link to="/contact">Kontakt</Link></li>
        </ul>
        
        <div className="nav-actions">
          <button className="btn-secondary">Zaloguj</button>
          <button className="btn-primary">🛒 Koszyk (0)</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
