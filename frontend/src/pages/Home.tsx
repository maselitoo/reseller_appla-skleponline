import './Home.css'

function Home() {
  return (
    <div className="home">
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
    </div>
  )
}

export default Home
