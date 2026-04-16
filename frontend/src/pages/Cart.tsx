import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Twój koszyk jest pusty</h2>
          <p>Dodaj produkty do koszyka, aby kontynuować zakupy</p>
          <button 
            className="btn-primary btn-large"
            onClick={() => navigate('/products')}
          >
            Przeglądaj produkty
          </button>
        </div>
      </div>
    )
  }

  const handleCheckout = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      alert('Zaloguj się, aby złożyć zamówienie')
      navigate('/login')
      return
    }
    
    alert(`Zamówienie na kwotę ${getTotalPrice().toLocaleString('pl-PL')} zł zostało złożone!\n\nDziękujemy za zakupy! 🎉`)
    clearCart()
    navigate('/')
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Koszyk zakupowy</h1>
        <p className="cart-subtitle">Masz {cart.length} {cart.length === 1 ? 'produkt' : 'produkty'} w koszyku</p>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{item.price.toLocaleString('pl-PL')} zł</p>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  {(item.price * item.quantity).toLocaleString('pl-PL')} zł
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="cart-item-remove"
                  title="Usuń z koszyka"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Podsumowanie</h2>
            
            <div className="summary-row">
              <span>Produkty ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <span>{getTotalPrice().toLocaleString('pl-PL')} zł</span>
            </div>

            <div className="summary-row">
              <span>Dostawa</span>
              <span>{getTotalPrice() >= 500 ? 'Gratis' : '20 zł'}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Razem</span>
              <span>{(getTotalPrice() + (getTotalPrice() >= 500 ? 0 : 20)).toLocaleString('pl-PL')} zł</span>
            </div>

            <button 
              className="btn-primary btn-large btn-full"
              onClick={handleCheckout}
            >
              Przejdź do płatności
            </button>

            <button 
              className="btn-secondary btn-large btn-full"
              onClick={() => navigate('/products')}
            >
              Kontynuuj zakupy
            </button>

            <div className="cart-info">
              <p>✓ Darmowa dostawa od 500 zł</p>
              <p>✓ 14 dni na zwrot</p>
              <p>✓ Bezpieczne płatności</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

// Made with Bob
