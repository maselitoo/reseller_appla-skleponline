import './Contact.css'

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Kontakt</h1>
        <p>Skontaktuj się z nami</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Dane kontaktowe</h2>
          
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>kontakt@resellerapple.pl</p>
              <p>support@resellerapple.pl</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <h3>Telefon</h3>
              <p>+48 123 456 789</p>
              <p>Pon-Pt: 9:00 - 18:00</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <h3>Adres</h3>
              <p>ul. Przykładowa 123</p>
              <p>00-001 Warszawa</p>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">⏰</span>
            <div>
              <h3>Godziny otwarcia</h3>
              <p>Poniedziałek - Piątek: 9:00 - 18:00</p>
              <p>Sobota: 10:00 - 14:00</p>
              <p>Niedziela: Zamknięte</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Wyślij wiadomość</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Imię i nazwisko</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Jan Kowalski"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="jan@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Temat</label>
              <input 
                type="text" 
                id="subject" 
                placeholder="Pytanie o produkt"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Wiadomość</label>
              <textarea 
                id="message" 
                rows={6}
                placeholder="Twoja wiadomość..."
                required
              />
            </div>

            <button type="submit" className="btn-primary btn-large">
              Wyślij wiadomość
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
