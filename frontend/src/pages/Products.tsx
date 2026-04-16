import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Products.css'

// Tymczasowe dane produktów z prawdziwymi obrazkami
const productsData = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'iPhone',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    description: 'Najnowszy iPhone z chipem A17 Pro',
    inStock: true
  },
  {
    id: 2,
    name: 'iPhone 15',
    category: 'iPhone',
    price: 4299,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop&sat=-100',
    description: 'iPhone 15 w świetnej cenie',
    inStock: true
  },
  {
    id: 3,
    name: 'MacBook Pro 14"',
    category: 'MacBook',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    description: 'MacBook Pro z chipem M3',
    inStock: true
  },
  {
    id: 4,
    name: 'MacBook Air 13"',
    category: 'MacBook',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop',
    description: 'Lekki i wydajny MacBook Air',
    inStock: true
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    category: 'iPad',
    price: 5799,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    description: 'Profesjonalny tablet Apple',
    inStock: true
  },
  {
    id: 6,
    name: 'Apple Watch Series 9',
    category: 'Watch',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    description: 'Najnowszy Apple Watch',
    inStock: true
  },
  {
    id: 7,
    name: 'AirPods Pro 2',
    category: 'AirPods',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop',
    description: 'Słuchawki z ANC',
    inStock: true
  },
  {
    id: 8,
    name: 'AirPods Max',
    category: 'AirPods',
    price: 2599,
    image: 'https://images.unsplash.com/photo-1625738183566-e3f5b8f8e3e5?w=400&h=400&fit=crop',
    description: 'Nauszne słuchawki premium',
    inStock: false
  }
]

// Kategorie jako stała poza komponentem
const categories = ['All', 'iPhone', 'MacBook', 'iPad', 'Watch', 'AirPods']

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [sortBy, setSortBy] = useState('name')

  // Aktualizuj kategorię z URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  const { addToCart } = useCart()

  // Funkcja dodawania do koszyka
  const handleAddToCart = (product: typeof productsData[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
    
    // Pokaż krótkie powiadomienie
    const notification = document.createElement('div')
    notification.className = 'cart-notification'
    notification.textContent = `✓ ${product.name} dodano do koszyka`
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.classList.add('show')
    }, 10)
    
    setTimeout(() => {
      notification.classList.remove('show')
      setTimeout(() => notification.remove(), 300)
    }, 2000)
  }

  // Filtrowanie produktów
  const filteredProducts = selectedCategory === 'All' 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory)

  // Sortowanie produktów
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Nasze Produkty</h1>
        <p>Odkryj najlepsze produkty Apple w najlepszych cenach</p>
      </div>

      <div className="products-container">
        {/* Filtry */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Kategorie</h3>
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sortuj</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Nazwa A-Z</option>
              <option value="price-asc">Cena: rosnąco</option>
              <option value="price-desc">Cena: malejąco</option>
            </select>
          </div>
        </aside>

        {/* Lista produktów */}
        <div className="products-grid">
          {sortedProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price.toLocaleString('pl-PL')} zł</span>
                  {product.inStock ? (
                    <button
                      className="btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Dodaj do koszyka
                    </button>
                  ) : (
                    <button className="btn-secondary" disabled>Brak w magazynie</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
