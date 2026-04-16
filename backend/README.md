# 🍎 Reseller Apple - Backend API

Backend API dla sklepu internetowego Reseller Apple zbudowany w Node.js, Express i MongoDB.

## 🚀 Funkcjonalności

- ✅ Autentykacja użytkowników (JWT)
- ✅ Zarządzanie produktami (CRUD)
- ✅ System zamówień
- ✅ System recenzji produktów
- ✅ Panel administracyjny
- ✅ Filtrowanie i sortowanie produktów
- ✅ Zarządzanie stanem magazynowym
- ✅ Bezpieczeństwo (Helmet, Rate Limiting)

## 📋 Wymagania

- Node.js (v18 lub nowszy)
- MongoDB (lokalnie lub MongoDB Atlas)
- npm lub yarn

## 🛠️ Instalacja

1. **Zainstaluj zależności:**
```bash
cd backend
npm install
```

2. **Skonfiguruj zmienne środowiskowe:**
```bash
cp .env.example .env
```

Edytuj plik `.env` i ustaw swoje wartości:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/reseller_apple
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

3. **Uruchom MongoDB:**
```bash
# Lokalnie
mongod

# Lub użyj MongoDB Atlas (cloud)
```

4. **Załaduj przykładowe dane (opcjonalne):**
```bash
npm run seed
```

5. **Uruchom serwer:**
```bash
# Development mode z auto-reload
npm run dev

# Production mode
npm start
```

Serwer będzie dostępny pod adresem: `http://localhost:5000`

## 📚 API Endpoints

### Autentykacja (`/api/auth`)

| Metoda | Endpoint | Opis | Dostęp |
|--------|----------|------|--------|
| POST | `/register` | Rejestracja użytkownika | Public |
| POST | `/login` | Logowanie | Public |
| GET | `/profile` | Pobierz profil | Private |
| PUT | `/profile` | Aktualizuj profil | Private |
| GET | `/users` | Lista użytkowników | Admin |
| DELETE | `/users/:id` | Usuń użytkownika | Admin |

### Produkty (`/api/products`)

| Metoda | Endpoint | Opis | Dostęp |
|--------|----------|------|--------|
| GET | `/` | Lista produktów | Public |
| GET | `/featured` | Wyróżnione produkty | Public |
| GET | `/categories` | Lista kategorii | Public |
| GET | `/:id` | Szczegóły produktu | Public |
| POST | `/` | Dodaj produkt | Admin |
| PUT | `/:id` | Aktualizuj produkt | Admin |
| DELETE | `/:id` | Usuń produkt | Admin |
| POST | `/:id/reviews` | Dodaj recenzję | Private |

### Zamówienia (`/api/orders`)

| Metoda | Endpoint | Opis | Dostęp |
|--------|----------|------|--------|
| POST | `/` | Utwórz zamówienie | Private |
| GET | `/myorders` | Moje zamówienia | Private |
| GET | `/:id` | Szczegóły zamówienia | Private |
| GET | `/` | Wszystkie zamówienia | Admin |
| GET | `/stats/summary` | Statystyki | Admin |
| PUT | `/:id/pay` | Oznacz jako opłacone | Private |
| PUT | `/:id/deliver` | Oznacz jako dostarczone | Admin |
| PUT | `/:id/status` | Zmień status | Admin |
| PUT | `/:id/cancel` | Anuluj zamówienie | Private |

## 🔐 Autoryzacja

API używa JWT (JSON Web Tokens) do autoryzacji. Aby uzyskać dostęp do chronionych endpointów:

1. Zaloguj się przez `/api/auth/login`
2. Otrzymasz token w odpowiedzi
3. Dodaj token do nagłówka Authorization:
```
Authorization: Bearer <your_token>
```

## 👤 Domyślne konta (po seed)

**Admin:**
- Email: `admin@resellerapple.pl`
- Hasło: `admin123`

**User:**
- Email: `jan@example.com`
- Hasło: `password123`

## 📦 Przykładowe zapytania

### Rejestracja
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jan Kowalski",
    "email": "jan@example.com",
    "password": "password123"
  }'
```

### Logowanie
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@resellerapple.pl",
    "password": "admin123"
  }'
```

### Pobierz produkty
```bash
curl http://localhost:5000/api/products
```

### Pobierz produkty z filtrowaniem
```bash
curl "http://localhost:5000/api/products?category=iPhone&sortBy=price-asc&page=1"
```

## 🗄️ Struktura bazy danych

### User
- name, email, password (hashed)
- role (user/admin)
- address, phone
- timestamps

### Product
- name, description, price
- category, image, images[]
- countInStock, inStock
- specifications (Map)
- reviews[], rating, numReviews
- featured, discount
- timestamps

### Order
- user (ref)
- orderItems[]
- shippingAddress
- paymentMethod, paymentResult
- prices (items, shipping, tax, total)
- isPaid, paidAt
- isDelivered, deliveredAt
- status, trackingNumber
- timestamps

## 🛡️ Bezpieczeństwo

- Helmet.js - zabezpieczenie nagłówków HTTP
- Rate Limiting - ochrona przed atakami DDoS
- CORS - kontrola dostępu
- JWT - bezpieczna autoryzacja
- Bcrypt - hashowanie haseł
- Walidacja danych wejściowych

## 📝 Skrypty

```bash
npm start          # Uruchom serwer
npm run dev        # Uruchom w trybie development
npm run seed       # Załaduj przykładowe dane
npm run seed -d    # Usuń wszystkie dane
```

## 🐛 Debugowanie

Logi są wyświetlane w konsoli. W trybie development używany jest Morgan do logowania requestów.

## 📄 Licencja

MIT

## 👥 Autorzy

Team Reseller Apple