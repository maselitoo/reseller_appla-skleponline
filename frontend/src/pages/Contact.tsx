import { useState, type FormEvent } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    // Symulacja wysyłki (później będzie to API call)
    setTimeout(() => {
      setSubmitMessage('✅ Wiadomość została wysłana! Odpowiemy najszybciej jak to możliwe.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
      
      // Wyczyść komunikat po 5 sekundach
      setTimeout(() => setSubmitMessage(''), 5000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

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
              <a href="mailto:kontakt@resellerapple.pl">kontakt@resellerapple.pl</a>
              <br />
              <a href="mailto:support@resellerapple.pl">support@resellerapple.pl</a>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <h3>Telefon</h3>
              <a href="tel:+48123456789">+48 123 456 789</a>
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
          {submitMessage && (
            <div className="submit-message">{submitMessage}</div>
          )}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Imię i nazwisko</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jan Kowalski"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jan@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Temat</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Pytanie o produkt"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Wiadomość</label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Twoja wiadomość..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary btn-large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
