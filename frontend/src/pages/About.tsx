import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>O nas</h1>
        <p>Poznaj naszą historię i misję</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Kim jesteśmy?</h2>
          <p>
            Jesteśmy zespołem pasjonatów technologii Apple, którzy postanowili stworzyć 
            najlepszy sklep z produktami Apple w Polsce. Naszym celem jest dostarczanie 
            wysokiej jakości produktów w konkurencyjnych cenach.
          </p>
        </section>

        <section className="about-section">
          <h2>Nasza misja</h2>
          <p>
            Chcemy być pierwszym wyborem dla każdego, kto szuka produktów Apple. 
            Oferujemy nie tylko świetne ceny, ale także profesjonalną obsługę, 
            szybką dostawę i pełne wsparcie posprzedażowe.
          </p>
        </section>

        <section className="about-section">
          <h2>Dlaczego my?</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <div>
                <h3>Gwarancja jakości</h3>
                <p>Wszystkie produkty z oficjalną gwarancją Apple</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <div>
                <h3>Szybka dostawa</h3>
                <p>Wysyłka w 24h na terenie całej Polski</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <h3>Najlepsze ceny</h3>
                <p>Konkurencyjne ceny i regularne promocje</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <h3>Profesjonalna obsługa</h3>
                <p>Doświadczony zespół zawsze gotowy pomóc</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
