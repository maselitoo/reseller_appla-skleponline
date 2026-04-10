import './App.css'

function App() {
  return (
    <div className="app">
      {/* Nawigacja */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🍎</span>
            <span className="logo-text">Reseller Apple</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Produkty</a></li>
            <li><a href="#about">O nas</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
          <div className="nav-actions">
            <button className="btn-secondary">Zaloguj</button>
            <button className="btn-primary">🛒 Koszyk (0)</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Najlepsze produkty Apple
            <br />
            <span className="gradient-text">w najlepszych cenach</span>
          </h1>
          <p className="hero-description">
            Odkryj naszą kolekcję iPhone'ów, MacBooków, iPadów i akcesoriów Apple.
            Gwarancja, szybka wysyłka, najlepsze ceny na rynku.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary btn-large">
              Zobacz produkty
            </button>
            <button className="btn-secondary btn-large">
              Dowiedz się więcej
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">500+</div>
            <div className="stat-label">Produktów</div>
          </div>
          <div className="stat">
            <div className="stat-number">2000+</div>
            <div className="stat-label">Zadowolonych klientów</div>
          </div>
          <div className="stat">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Wsparcie</div>
          </div>
        </div>
      </section>

      {/* Kategorie */}
      <section className="categories-section">
        <h2 className="section-title">Popularne kategorie</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">📱</div>
            <h3>iPhone</h3>
            <p>Najnowsze modele iPhone</p>
          </div>
          <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>MacBook</h3>
            <p>MacBook Air i Pro</p>
          </div>
          <div className="category-card">
            <div className="category-icon">⌚</div>
            <h3>Apple Watch</h3>
            <p>Inteligentne zegarki</p>
          </div>
          <div className="category-card">
            <div className="category-icon">🎧</div>
            <h3>AirPods</h3>
            <p>Bezprzewodowe słuchawki</p>
          </div>
        </div>
      </section>

      {/* Dlaczego my */}
      <section className="features-section">
        <h2 className="section-title">Dlaczego warto wybrać nas?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Gwarancja jakości</h3>
            <p>Wszystkie produkty z pełną gwarancją producenta</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Szybka dostawa</h3>
            <p>Wysyłka w 24h, darmowa dostawa od 500 zł</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Najlepsze ceny</h3>
            <p>Konkurencyjne ceny i regularne promocje</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Bezpieczne płatności</h3>
            <p>BLIK, karty, przelewy - wybierz co wolisz</p>
          </div>
        </div>
      </section>

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
              <li><a href="#contact">Kontakt</a></li>
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
  )
}

export default App

// Made with Bob
