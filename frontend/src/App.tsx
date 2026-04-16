import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Cart from './pages/Cart'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          {/* Footer */}
          <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Reseller Apple</h4>
              <p>Najlepszy sklep z produktami Apple w Polsce</p>
            </div>
            <div className="footer-section">
              <h4>Sklep</h4>
              <ul>
                <li><Link to="/products?category=iPhone">iPhone</Link></li>
                <li><Link to="/products?category=MacBook">MacBook</Link></li>
                <li><Link to="/products?category=iPad">iPad</Link></li>
                <li><Link to="/products?category=Watch">Apple Watch</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Pomoc</h4>
              <ul>
                <li><Link to="/about">O nas</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>
                <li><Link to="/cart">Koszyk</Link></li>
                <li><Link to="/login">Logowanie</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Kontakt</h4>
              <p>📧 kontakt@resellerapple.pl</p>
              <p>📞 +48 123 456 789</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Reseller Apple. Wszystkie prawa zastrzeżone.</p>
          </div>
          </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
