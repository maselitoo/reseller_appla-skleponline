import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()
  const totalItems = getTotalItems()

  const handleLogout = () => {
    logout()
    alert('Wylogowano pomyślnie!')
    navigate('/')
  }

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
          {user ? (
            <>
              <span className="user-greeting">Cześć, {user.name}!</span>
              <button onClick={handleLogout} className="btn-secondary">
                🚪 Wyloguj
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-secondary">👤 Zaloguj</Link>
          )}
          <Link to="/cart" className="btn-primary cart-btn">
            🛒 Koszyk {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
