import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../services/api'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Hasła nie są identyczne')
      return
    }

    setIsLoading(true)
    try {
      const userData = isLogin
        ? await authApi.login(formData.email, formData.password)
        : await authApi.register(formData.name, formData.email, formData.password)

      login(userData)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd. Spróbuj ponownie.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1>{isLogin ? 'Zaloguj się' : 'Utwórz konto'}</h1>
          <p className="login-subtitle">
            {isLogin
              ? 'Witaj ponownie! Zaloguj się do swojego konta.'
              : 'Dołącz do nas i zacznij zakupy!'}
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Imię i nazwisko</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jan Kowalski"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jan@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Potwierdź hasło</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required={!isLogin}
                  minLength={6}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn-primary btn-large btn-full"
              disabled={isLoading}
            >
              {isLoading
                ? 'Proszę czekać...'
                : isLogin
                ? 'Zaloguj się'
                : 'Utwórz konto'}
            </button>
          </form>

          <div className="login-divider">
            <span>lub</span>
          </div>

          <button
            type="button"
            className="btn-secondary btn-large btn-full"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
              setFormData({ name: '', email: '', password: '', confirmPassword: '' })
            }}
          >
            {isLogin ? 'Utwórz nowe konto' : 'Mam już konto'}
          </button>

          <div className="login-footer">
            <Link to="/">← Powrót do strony głównej</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
