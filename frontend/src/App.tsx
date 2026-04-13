import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
                <li><a href="#iphone">iPhone</a></li>
                <li><a href="#macbook">MacBook</a></li>
                <li><a href="#ipad">iPad</a></li>
                <li><a href="#watch">Apple Watch</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Pomoc</h4>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#shipping">Dostawa</a></li>
                <li><a href="#returns">Zwroty</a></li>
                <li><a href="/contact">Kontakt</a></li>
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
    </Router>
  )
}

export default App
